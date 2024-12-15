document.addEventListener('DOMContentLoaded', () => {
  const articleDetails = document.getElementById('article-details');
  const blogTitle = document.getElementById('blogTitle'); // Отримуємо <h1>
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id');

  fetch('data/blog.json')
    .then(response => response.json())
    .then(articles => {
      const article = articles.find(a => a.id == articleId);
      if (article) {
        // Встановлюємо заголовок статті у <h1 id="blogTitle">
        blogTitle.textContent = article.title;
        
        // Рендеримо інший вміст
        renderArticle(article);
      } else {
        blogTitle.textContent = 'Стаття не знайдена';
        articleDetails.innerHTML = '<p>Стаття не знайдена</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching article data:', error);
      blogTitle.textContent = 'Помилка';
      articleDetails.innerHTML = '<p>Не вдалося завантажити дані статті</p>';
    });

  function renderArticle(article) {
    articleDetails.innerHTML = `
      <p class='article-author'>Автор: ${article.author}</p>
      <p class='article-date'>Дата: ${article.date}</p>
      <img src="${article.image}" alt="${article.title}" style="max-width:100%; max-height:500px; margin-bottom:20px;">
      <div class='article-content'>${article.content}</div>
    `;
  }
});