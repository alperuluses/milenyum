import { db, doc, getDoc } from './firebase-config.js';

async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        const container = document.querySelector('.page-container');
        if (container) {
             container.innerHTML = '<p style="text-align:center; color:white; margin-top: 5rem;">Ürün bulunamadı.</p>';
        }
        return;
    }

    try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const product = docSnap.data();

            document.title = `${product.name} | Milenyum Deri`;

            // Update Elements
            const mainImg = document.getElementById('mainImg');
            if (mainImg) {
                mainImg.src = product.image;
                mainImg.alt = product.name;
                mainImg.onload = () => {
                    mainImg.style.display = 'block';
                    document.getElementById('mainImgContainer').classList.remove('skeleton'); // Remove shimmer
                };
            }

            const breadcrumbTitle = document.getElementById('breadcrumb-title');
            if (breadcrumbTitle) breadcrumbTitle.textContent = product.name;
            
            const productName = document.getElementById('product-name');
            if (productName) {
                productName.textContent = product.name;
                productName.classList.remove('skeleton', 'skeleton-title');
            }
            
            const productPrice = document.getElementById('product-price');
            if (productPrice) {
                productPrice.textContent = `₺${product.price.toLocaleString('tr-TR')}`;
                productPrice.classList.remove('skeleton', 'skeleton-price');
            }
            
            const productDesc = document.getElementById('product-description');
            if (productDesc) productDesc.innerHTML = `<p>${product.description}</p>`;
            
            const productFeatures = document.getElementById('product-features');
            if (productFeatures) {
                productFeatures.textContent = product.features || "%100 Hakiki Deri. El yapımı üretim.";
                productFeatures.classList.remove('skeleton', 'skeleton-text');
            }

            // Sizes and WhatsApp Logic
            const sizeContainer = document.getElementById('size-container');
            if (sizeContainer) {
                sizeContainer.innerHTML = '';
                const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];

                // Default selection (try L, otherwise first available)
                let selectedSize = sizes.includes('L') ? 'L' : sizes[0];

                function updateWhatsappLink() {
                    const message = `Merhaba, ${product.name} modeli (${selectedSize} Beden) hakkında bilgi almak istiyorum.`;
                    const whatsappUrl = `https://wa.me/905365561808?text=${encodeURIComponent(message)}`;
                    const whatsappBtn = document.getElementById('whatsapp-btn');
                    if (whatsappBtn) {
                        whatsappBtn.href = whatsappUrl;
                        whatsappBtn.textContent = 'WHATSAPP İLE SİPARİŞ VER';
                        whatsappBtn.classList.remove('skeleton', 'skeleton-btn');
                    }
                }

                sizes.forEach((size) => {
                    const btn = document.createElement('button');
                    btn.className = `size-btn ${size === selectedSize ? 'selected' : ''}`;
                    btn.textContent = size;

                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
                        selectedSize = size;
                        updateWhatsappLink();
                    });
                    sizeContainer.appendChild(btn);
                });

                // Initial Link Set
                updateWhatsappLink();
            }

        } else {
             const container = document.querySelector('.page-container');
             if (container) container.innerHTML = '<p style="text-align:center; color:white; margin-top: 5rem;">Böyle bir ürün bulunamadı (ID hatalı).</p>';
        }
    } catch (error) {
        console.error("Error getting document:", error);
         const container = document.querySelector('.page-container');
         if (container) container.innerHTML = '<p style="text-align:center; color:white; margin-top: 5rem;">Ürün yüklenirken hata oluştu.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadProductDetails);
