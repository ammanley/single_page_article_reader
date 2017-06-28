// Can also use $(function(){
$(document).ready(function(){

// ---USER STATE (BE CAREFUL!)--- //

  const setState = (page="home", likes=[], articleData=null) => {
    let userState = {
      page,
      likes,
      articleData
    }

    localStorage.setItem("userState", JSON.stringify(userState));
  }

  let userState = JSON.parse(localStorage.getItem("userState"));

  if (userState == null) {
    setState();
    userState = JSON.parse(localStorage.getItem("userState"));
  } else {
    userState = userState;
  }



// ---TEMPLATES--- //
 
  // Template for home page article population
  const articleComponent = (idx, headerImg, title, publish, preview) => 
    `<div>
      <h3>${title}</h3>
      <img src=${headerImg} class="img-responsive"></img>
      <p>${publish}</p>
      <div>${preview}</div>
      <button id=${idx}>Read more...</button>
    </div>
  `;

  // Template for article detail page population
  const articleDetailComponent = (articleData) => 
    `
    <button><-- Go Back</button>
    <h3>${articleData["post_title"]}</h3>
    <h4>By ${articleData["post_author"]}</h4>
    <p>Published ${articleData["post_date"]}</p>
    <div>${articleData["post_content"]}</div>
    <button><-- Go Back</button>
    `


// ---CONTROLS--- //

  const indexPopulate = () => {
    $(".article-list-component")
      .empty()
      .append('<h1 class="text-center article-header">Articles</h1>')
      // if articleData state is not set, will run GET request and set it
      // refactor to do this in the constructor
    if (JSON.parse(localStorage.getItem("userState"))['articleData'] == null) {
      console.log("loading from server")
      $.getJSON('http://localhost:3000/articles', (r) => {
        $(".article-list-component").append()
        r.forEach((article, idx) => {
          $(".article-list-component").append(
            articleComponent(idx, article.headerImage, article.post_title, article.post_date, article.post_name)
          );
          $(`#${idx}`).click(articleDetail);
        });
        setState(userState['page'], userState['likes'], articleData=r)
      });
    // else renders from saved articleData state
    } else {
      console.log("loading from local storage")
      let r = userState["articleData"]
      $(".article-list-component").append()
      r.forEach((article, idx) => {
        $(".article-list-component").append(
          articleComponent(idx, article.headerImage, article.post_title, article.post_date, article.post_name)
        );
        $(`#${idx}`).click(articleDetail);
      });
    };
    if (userState["page"] !== "home") {
      userState["page"] = "home";
      setState(userState["page"], userState["likes"], userState["articleData"])
    };
  };


  const articleDetail = (event, id) =>  {
    let articleData;
    if (id) {
      articleData = userState["articleData"][id];
    } else {
      articleData = userState["articleData"][event.target.id];
    }

    $(".article-list-component").empty()
      .append(articleDetailComponent(articleData));
      $("button").click(indexPopulate);

    userState["page"] = id || event.target.id
    setState(userState["page"], userState["likes"], userState["articleData"])
  };


  userState["page"] === "home" ? indexPopulate() : articleDetail(event=null, id=userState["page"])


});
