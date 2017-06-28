// Can also use $(function(){
$(document).ready(function(){

  const articleComponent = (title, publish, preview) => `
    <div>
      <h3>${title}</h3>
      <p>${publish}</p>
      <p>${preview}</p>
    </div>
  `;

  const indexPopulate = () => {
    $(".article-list-component").
      append('<h1 class="text-center article-header">Articles</h1>')
    $.getJSON('http://localhost:3000/articles', (r) => {
      $(".article-list-component").append()
      r.forEach((article) => {
        $(".article-list-component").append(
          articleComponent(article.post_title, article.post_date, article.post_name)
        );
      });
    });
  }

  indexPopulate()

});
