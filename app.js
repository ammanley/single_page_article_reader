$(function(){

// ---USER STATE (Be careful, don't DEATH STAR this!!!)--- //


  // Sets state in local storage based on defaults or called with userState
  const setState = (page="home", likes={}, articleData=null) => {
    let userState = {
      page,
      likes,
      articleData
    }

    localStorage.setItem("userState", JSON.stringify(userState));
  }

  // UserState object used to track and make temporary changes to state
  // Must use setState based on this to persist state changes
  let userState = JSON.parse(localStorage.getItem("userState"));

  // Start up if on pageload there was no state existing, set if not
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
      <button id=${idx}>Read more</button>
    </div>
  `;

  // Template for article detail page population
  const articleDetailComponent = (articleData) => 
    `
    <button><-- Go Back</button>
    <h3>${articleData["post_title"]}</h3>
    <div id="liked-button-container"><span id="like-button" class="glyphicon glyphicon-heart-empty"></span></div>
    <h4>By ${articleData["post_author"]}</h4>
    <p>Published ${articleData["post_date"]}</p>
<<<<<<< HEAD
    <div class="article-detail-content">${articleData["post_content"]}</div>
=======
    <div>${articleData["post_content"]}</div>
>>>>>>> c351e2d2eca39d73289da6802a42f965036ec370
    <button><-- Go Back</button>
    `


// ---CONTROLS--- //

  const indexPopulate = () => {
  // Empties in case of page reload vs coming from article detail page
    $(".article-list-component")
      .empty()
      .append('<h1 class="text-center article-header">Articles</h1>')
    // Ff articleData state is not set, will run GET request and set it
    // refactor to do this in the constructor
    if (JSON.parse(localStorage.getItem("userState"))['articleData'] == null) {
      console.log("loading from server")
      $.getJSON('http://localhost:3000/articles', (r) => {
        $(".article-list-component").append()
      // Creates item for each component in the article JSON blob
        r.forEach((article, idx) => {
          $(".article-list-component").append(
            articleComponent(idx, article.headerImage, article.post_title, article.post_date, article.post_name)
          );
        // Add click event handler to each item that will be used by articleDetailComponent
        // to grab the right data from storage and render the detail page
          $(`#${idx}`).click(articleDetail);
        });
      // After render, sets state based on if we were home or not
      	userState['articleData'] = r;
        setState(userState['page'], userState['likes'], articleData=r)
      });
    // else renders from saved articleData state
    } else {
      console.log("loading from local storage")
      let r = userState["articleData"]
      $(".article-list-component").append()
      r.forEach((article, idx) => {
        $(".article-list-component").append(
          articleComponent(idx, article.headerImage, article.post_title, article.post_date,
          // regular expression truncates most likely HTML tags, replaces with blank
           article.post_content.replace(/<(?:.|\r\n|\n|\r)*?>/gm, '').slice(0,400)+"...")
        );
        $(`#${idx}`).click(articleDetail);
      });
    };
  // After render, sets state based on if we were home or not
    if (userState["page"] !== "home") {
      userState["page"] = "home";
      setState(userState["page"], userState["likes"], userState["articleData"])
    };
  };


  const articleDetail = (event, id) =>  {
    let articleData, idx, liked;
  // Set incoming idx based on click event or page reload
    if (id) {
      articleData = userState["articleData"][id];
      idx = id;
    } else {
      articleData = userState["articleData"][event.target.id];
      idx = event.target.id
    }
  // Clear container and populate with article details; 
  // event handler on button to go back to home page
    $(".article-list-component").empty()
      .append(articleDetailComponent(articleData));
      $("button").click(indexPopulate);
      $("img").addClass("img-responsive");
    // Set Glyphicon based on user state object
      userState["likes"][idx] !== undefined ? liked = true : liked = false;
      if (liked) {
        $("#liked-button-container").find("span").removeClass("glyphicon-heart-empty").addClass("glyphicon-heart");
      }
    // Toggle glyphicon appearence on click, change userState and setState to localStorage 
    // in case of page reload or coming back to view later
      $("#liked-button-container").click(()=> {
        let icon = $(this).find("span")
        icon.toggleClass("glyphicon-heart-empty glyphicon-heart");
      // If key exists, unlike/delete key, else set key to true; setState in both cases
        if (userState["likes"][idx]) {
          delete userState["likes"][idx];
          setState(userState["page"], userState["likes"], userState["articleData"])
        } else {
           userState["likes"][idx] = true;
           setState(userState["page"], userState["likes"], userState["articleData"])
        }
      });
  // Page set based on 1 of 2 load scenarios, set to state for changing or coming back later
    userState["page"] = id || event.target.id
    setState(userState["page"], userState["likes"], userState["articleData"])
    $(window).scrollTop(0);
  };

  // Are we home or on a detail page?
  userState["page"] === "home" ? indexPopulate() : articleDetail(event=null, id=userState["page"])


});
