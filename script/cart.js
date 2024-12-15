document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  const modalOverlay = document.getElementById('modal-overlay');
  const deliveryModal = document.getElementById('delivery-modal');
  const thankYouModal = document.getElementById('thank-you-modal');
  const deliveryForm = document.getElementById('delivery-form');
  const closeThankYouModal = document.getElementById('close-thank-you-modal');

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let totalPrice = 0;

  // Відключити кнопку оформлення, якщо кошик порожній
  if (cartItems.length === 0) {
    checkoutBtn.disabled = true;
    checkoutBtn.classList.add('disabled-btn'); // Додати клас для стилізації вимкненої кнопки
  }

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">${item.price} грн</div>
      </div>
      <button class="remove-btn">Видалити</button>
    `;
    cartItemsContainer.appendChild(cartItem);

    totalPrice += parseInt(item.price);

    cartItem.querySelector('.remove-btn').addEventListener('click', () => {
      const index = cartItems.indexOf(item);
      if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        location.reload();
      }
    });
  });

  cartTotalElement.textContent = `${totalPrice} грн`;

  // Відкрити модальне вікно форми доставки
  checkoutBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
    deliveryModal.classList.remove('hidden');
  });

  // Обробка форми доставки
  deliveryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Закрити модальне вікно форми та відкрити подяку
    deliveryModal.classList.add('hidden');
    thankYouModal.classList.remove('hidden');
  });

  // Закрити модальне вікно подяки та очистити кошик
  closeThankYouModal.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    thankYouModal.classList.add('hidden');

    // Очищення кошика
    localStorage.removeItem('cart');
    cartItemsContainer.innerHTML = '';
    cartTotalElement.textContent = '0 грн';

    // Вимкнути кнопку оформлення
    checkoutBtn.disabled = true;
    checkoutBtn.classList.add('disabled-btn');
  });
});