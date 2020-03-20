axios.get('https://newsapi.org/v2/top-headlines?country=in&category=health&sortBy=popularity&apiKey=7c7533a5d633487bb4367491d1c0686b')
  .then(news => {
    // console.log(news.data.articles);
    document.querySelector('.preloader').style.display = 'none';
    document.querySelector('#page').style.display = 'block';
    let content = ""
    for (news of news.data.articles) {
      // console.log(news);
      content += `<div class="col-md-6 mb-2">
      <div class='card' style="height: 520px;">
      <img src=${news.urlToImage} alt="Removed Image" class="rounded img-fluid" style="height: 300px"/>
      <div class="card-body">
      <a href=${news.url} style="text-decoration: none">
      <h4 class="text-primary">${news.title}</h4>
      </a>
    ${news.description}
    <div class="float-right text-success">
       ~ ${news.author}
      </div>
    </div>
    </div>
      </div>`
    }
    document.getElementById('news').innerHTML = content
  })