document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // Отримуємо ID товару з URL
    const productDetails = document.getElementById('productDetails');
    const productTitle = document.getElementById('productTitle');
  
    fetch('data/products.json')
      .then(response => response.json())
      .then(products => {
        const product = products.find(item => item.id == productId);
  
        if (product) {
          // Встановлюємо заголовок сторінки
          productTitle.textContent = product.title;
  
          // Рендеримо деталі товару
          productDetails.innerHTML = `
            <div style="flex: 1; min-width: 300px;">
              <img src="${product.image}" alt="${product.title}" style="max-width: 100%; border-radius: 8px;">
            </div>
            <div style="flex: 2; min-width: 300px;">
              <h2>${product.title}</h2>
              <p><strong>Ціна:</strong> ${product.price} грн</p>
              <p><strong>Опис:</strong> ${product.description}</p>
              <h3>Характеристики:</h3>
              <ul>
                <li><strong>Тип:</strong> ${product.specifications.type}</li>
                <li><strong>Підключення:</strong> ${product.specifications.connectivity}</li>
                <li><strong>Час роботи:</strong> ${product.specifications.batteryLife}</li>
                <li><strong>Шумозаглушення:</strong> ${product.specifications.noiseCancellation}</li>
                <li><strong>Колір:</strong> ${product.specifications.color}</li>
              </ul>
              <button class="link-btn add-to-cart-btn" data-id="${product.id}">Додати в кошик</button>
            </div>
          `;
  
          // Додаємо функціонал додавання до кошика
          initializeAddToCart(products);
        } else {
          productTitle.textContent = "Товар не знайдено";
          productDetails.innerHTML = `<p>На жаль, товар із таким ID не знайдено.</p>`;
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
        productTitle.textContent = "Помилка";
        productDetails.innerHTML = `<p>Не вдалося завантажити інформацію про товар.</p>`;
      });
  
    function initializeAddToCart(products) {
      document.querySelectorAll('.add-to-cart-btn[data-id]').forEach(button => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-id');
          const product = products.find(p => p.id == productId);
  
          if (product) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id == product.id);
  
            if (existingProduct) {
              alert(`${product.title} вже додано до корзини`);
            } else {
              cart.push(product);
              localStorage.setItem('cart', JSON.stringify(cart));
              updateCartCount();
              alert(`${product.title} додано до корзини`);
            }
          }
        });
      });
    }
  
    // Функція для оновлення кількості товарів у кошику
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      document.getElementById('cart-count').textContent = cart.length;
    }
  
    // Ініціалізація кількості товарів у кошику при завантаженні сторінки
    updateCartCount();
  });