let currentFilters = {
  search: '',
  category: 'All',
  minPrice: '',
  maxPrice: '',
  sort: 'default'
};

function initShop() {
  renderCategoryFilters();
  setupShopEvents();
  renderShop();
}

function renderCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;
  const categories = ['All', 'Seeds', 'Fertilizers', 'Crop Protection', 'Gardening Tools', 'Animal Feeds'];
  container.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.style.cssText = 'text-align: left; padding: 0.5rem 0.625rem; background: ' + (cat === currentFilters.category ? 'var(--cocoa-brown)' : 'transparent') + '; color: ' + (cat === currentFilters.category ? 'white' : 'var(--dark-text)') + '; border-radius: var(--radius); font-family: Inter, sans-serif; font-size: 0.875rem; cursor: pointer;';
    btn.onclick = function() {
      currentFilters.category = cat;
      renderCategoryFilters();
      renderShop();
    };
    container.appendChild(btn);
  });
}

function setupShopEvents() {
  const searchInput = document.getElementById('shopSearchInput');
  const sortSelect = document.getElementById('sortSelect');
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      currentFilters.search = e.target.value.toLowerCase();
      renderShop();
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', function(e) {
      currentFilters.sort = e.target.value;
      renderShop();
    });
  }
  if (minPrice) {
    minPrice.addEventListener('input', function(e) {
      currentFilters.minPrice = e.target.value;
      renderShop();
    });
  }
  if (maxPrice) {
    maxPrice.addEventListener('input', function(e) {
      currentFilters.maxPrice = e.target.value;
      renderShop();
    });
  }
}

function clearAllFilters() {
  currentFilters = { search: '', category: 'All', minPrice: '', maxPrice: '', sort: 'default' };
  document.getElementById('shopSearchInput').value = '';
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.getElementById('sortSelect').value = 'default';
  renderCategoryFilters();
  renderShop();
}

function renderShop() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultCount');
  const emptyEl = document.getElementById('emptyState');
  if (!grid) return;
  
  let filtered = products.filter(p => {
    const matchesSearch = !currentFilters.search || 
      p.name.toLowerCase().includes(currentFilters.search) ||
      p.description.toLowerCase().includes(currentFilters.search);
    const matchesCategory = currentFilters.category === 'All' || p.category === currentFilters.category;
    let matchesPrice = true;
    if (currentFilters.minPrice && p.price < parseFloat(currentFilters.minPrice)) matchesPrice = false;
    if (currentFilters.maxPrice && p.price > parseFloat(currentFilters.maxPrice)) matchesPrice = false;
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  if (currentFilters.sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  else if (currentFilters.sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  else if (currentFilters.sort === 'name-asc') filtered.sort((a,b) => a.name.localeCompare(b.name));
  else if (currentFilters.sort === 'name-desc') filtered.sort((a,b) => b.name.localeCompare(a.name));
  
  if (countEl) countEl.textContent = filtered.length;
  
  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }
  
  if (emptyEl) emptyEl.style.display = 'none';
  grid.innerHTML = '';
  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product__card';
     card.innerHTML = '<img src="' + product.image + '" alt="' + product.name + '" class="product__image" onerror="this.src=\'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=220&fit=crop\'">' +
      '<div class="product__content">' +
      '<span class="product__category">' + product.category + '</span>' +
      '<h3 class="product__name">' + product.name + '</h3>' +
      '<p class="product__description">' + (product.description.length > 80 ? product.description.substring(0,80)+'...' : product.description) + '</p>' +
      '<div class="product__price">₱' + product.price.toLocaleString('en-PH') + '</div>' +
      '<div class="product__actions">' +
      '<button class="btn btn--secondary" onclick="alert(\'' + product.name.replace(/'/g,"\\\'") + '\\n' + product.description.replace(/'/g,"\\\'") + '\\nPrice: ₱' + product.price.toLocaleString('en-PH') + '\\nStock: ' + product.stock + '\')">View Details</button>' +
      '<button class="btn btn--primary" onclick="addToCart(' + product.id + ', 1); updateCartCount();">Add to Cart</button>' +
      '</div>' +
      '</div>';
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('productsGrid')) {
    initShop();
  }
});
