document.addEventListener('DOMContentLoaded', () => {
    const catalogItemsContainer = document.getElementById('catalog-items');
    const searchInput = document.getElementById('search-input');
    const filterRating = document.getElementById('filter-rating');
    const filterPrice = document.getElementById('filter-price');
  
    let headphones = [];
  
    // Завантаження даних із JSON
    fetch('data/products.json')
      .then(response => response.json())
      .then(data => {
        headphones = data;
        renderCatalog(headphones);
      })
      .catch(error => console.error('Error fetching data:', error));
  
    // Функція для рендеру каталогу
    function renderCatalog(items) {
      catalogItemsContainer.innerHTML = '';
      items.forEach(item => {
        const catalogItem = `
          <div class="catalog-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="catalog-item-info">
              <h3>${item.title}</h3>
              <p>${item.price} грн</p>
              <p>Рейтинг: ${'⭐'.repeat(item.rating)}</p>
              <button class="details-btn" data-id="${item.id}">Деталі</button>
            </div>
          </div>
        `;
        catalogItemsContainer.insertAdjacentHTML('beforeend', catalogItem);
      });
  
      // Обробка кліків на кнопки "Деталі"
      document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-id');
          const product = headphones.find(item => item.id == productId);
          if (product) {
            window.location.href = `headphones-details.html?id=${product.id}`;
          }
        });
      });
    }
  
    // Функції для фільтрації
    function filterItems() {
      let filtered = [...headphones];
  
      const searchQuery = searchInput.value.toLowerCase();
      if (searchQuery) {
        filtered = filtered.filter(item => item.title.toLowerCase().includes(searchQuery));
      }
  
      const selectedRating = filterRating.value;
      if (selectedRating) {
        filtered = filtered.filter(item => item.rating == selectedRating);
      }
  
      const selectedPriceOrder = filterPrice.value;
      if (selectedPriceOrder) {
        filtered = filtered.sort((a, b) => {
          return selectedPriceOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });
      }
  
      renderCatalog(filtered);
    }
  
    // Додавання обробників для фільтрів
    searchInput.addEventListener('input', filterItems);
    filterRating.addEventListener('change', filterItems);
    filterPrice.addEventListener('change', filterItems);
  });