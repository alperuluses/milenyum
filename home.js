import { db, collection, getDocs } from './firebase-config.js';

async function loadProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  
  try {
    // Skeleton is already in HTML, just fetch data
    const querySnapshot = await getDocs(collection(db, "products"));

    if (querySnapshot.empty) {
      grid.innerHTML = '<p style="text-align:center; color:white; width: 100%;">Henüz ürün bulunmuyor.</p>';
      return;
    }

    grid.innerHTML = ''; // Clear loading

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const card = `
                    <a href="product-detail.html?id=${doc.id}" class="product-card" style="display: block;">
                        <div class="card-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="card-info">
                            <h3>${product.name}</h3>
                            <p class="price">₺${product.price.toLocaleString('tr-TR')}</p>
                            <span class="btn-shop">İNCELE</span>
                        </div>
                    </a>
                `;
      grid.innerHTML += card;
    });
  } catch (error) {
    console.error("Error loading products:", error);
    grid.innerHTML = '<p style="text-align:center; color:white; width: 100%;">Ürünler yüklenirken bir hata oluştu.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
