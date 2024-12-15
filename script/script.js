document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      // Вибір контейнерів
      const swiperWrapper = document.getElementById('swiper-wrapper');
      const bestsellerGrid = document.getElementById('bestseller-grid');

      // Додавання товарів у "Нові надходження"
      products.forEach(product => {
        if (product.isNew) {
          const isNewBadge = 'grid-item__badge-new';
          const ratingStars = Array(product.rating).fill('<i class="fa-solid fa-star"></i>').join('');
      
          const productSlide = `
            <div class="swiper-slide">
              <div class="grid-item grid-item__badge ${isNewBadge}">
                <div class="like vertical-center justify-center">
                  <i class="fa-regular fa-heart"></i>
                </div>
                <div class="img relative">
                  <img src="${product.image}" alt="${product.title}">
                  <button class="btn btn__black absolute vertical-center justify-center" data-id="${product.id}">
                    Додати в корзину
                  </button>
                </div>
                <div class="grid-item-content">
                  <div class="rating">
                    ${ratingStars}
                  </div>
                  <div class="grid-item-content-title">
                    ${product.title}
                  </div>
                  <div class="grid-item-content-price">
                    ${product.price} грн.
                  </div>
                </div>
              </div>
            </div>
          `;
      
          swiperWrapper.insertAdjacentHTML('beforeend', productSlide);
        }
      });

      // Додавання товарів у "Хіти продажів"
      const bestsellers = products.filter(product => product.bestseller);
      bestsellers.forEach(product => {
        const ratingStars = Array(product.rating).fill('<i class="fa-solid fa-star"></i>').join('');

        const bestsellerCard = `
          <div class="grid-item grid-item__badge grid-item__badge-hit">
            <div class="like vertical-center justify-center">
              <i class="fa-regular fa-heart"></i>
            </div>
            <div class="img relative">
              <img src="${product.image}" alt="${product.title}">
              <button class="btn btn__black absolute vertical-center justify-center" data-id="${product.id}">
                Додати в корзину
              </button>
            </div>
            <div class="grid-item-content">
              <div class="rating">
                ${ratingStars}
              </div>
              <div class="grid-item-content-title">
                ${product.title}
              </div>
              <div class="grid-item-content-price">
                ${product.price} грн.
              </div>
            </div>
          </div>
        `;

        bestsellerGrid.insertAdjacentHTML('beforeend', bestsellerCard);
      });

      // Додавання товару до кошика
      document.querySelectorAll('.btn[data-id]').forEach(button => {
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

      // Ініціалізація Swiper
      if (document.querySelector('.swiper-container')){
        new Swiper('.swiper-container', {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1.8,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.8,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.8,
              spaceBetween: 20,
            },
          },
        });
      }
      

      
      // Обробка натискань на "лайк"
      document.querySelectorAll('.like').forEach(likeBtn => {
        likeBtn.addEventListener('click', () => {
          const heartIcon = likeBtn.querySelector('i');
          if (heartIcon.classList.contains('fa-regular')) {
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid');
          } else {
            heartIcon.classList.remove('fa-solid');
            heartIcon.classList.add('fa-regular');
          }
        });
      });
    })
    .catch(error => console.error('Error fetching products:', error));

  const modal = document.getElementById('modalImg');
  const modalImg = document.getElementById('modal-img');
  const closeModal = document.getElementById('modal-close');

  // Відкрити модальне вікно при кліку на блок
  document.querySelectorAll('.advantages-grid-item').forEach(item => {
    item.addEventListener('click', () => {
      const bgImage = item.getAttribute('data-bg');
      modalImg.src = bgImage;
      modal.style.display = 'flex';
    });
  });

  // Закрити модальне вікно
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Закрити модальне вікно при кліку поза зображенням
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });



  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
  }


})
