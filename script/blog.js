document.addEventListener('DOMContentLoaded', () => {
  const blogList = document.getElementById('blog-list');

  // Завантаження JSON
  fetch('data/blog.json')
    .then(response => response.json())
    .then(articles => {
      renderBlogList(articles);
    })
    .catch(error => console.error('Error fetching blog data:', error));

  // Рендер списку статей
  function renderBlogList(articles) {
    blogList.innerHTML = '';
    articles.forEach(article => {
      
      const blogItem = `
        <div class="blog-item">
          <img src="${article.image}" alt="${article.title}">
          <div class="blog-item-info">
            <h3>${article.title}</h3>
            <p>Автор: ${article.author}</p>
            <p>Дата: ${article.date}</p>
            <p class='blog-description'>${article.shortDescription}</p>
            <a href="blog-details.html?id=${article.id}" class="details-link">Читати далі</a>
          </div>
        </div>
      `;
      blogList.insertAdjacentHTML('beforeend', blogItem);
    });
  }
});