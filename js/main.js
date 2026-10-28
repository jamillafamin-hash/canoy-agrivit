function getCart() {
  try {
    const cart = localStorage.getItem('canoyAgrivitCart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('canoyAgrivitCart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('.nav__cart-count');
  cartCountElements.forEach(el => {
    el.textContent = count;
  });
}

function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    let newQty = existingItem.quantity + quantity;
    if (product.stock && newQty > product.stock) {
      alert("Only " + product.stock + " units available in stock.");
      newQty = product.stock;
    }
    if (newQty < 1) newQty = 1;
    existingItem.quantity = newQty;
  } else {
    let qty = quantity;
    if (product.stock && qty > product.stock) {
      alert("Only " + product.stock + " units available in stock.");
      qty = product.stock;
    }
    if (qty < 1) qty = 1;
    cart.push({
      id: productId,
      quantity: qty
    });
  }
  
  saveCart(cart);
  updateCartCount();
  alert(product.name + ' added to cart!');
}

function getCartWithDetails() {
  const cart = getCart();
  return cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return {
      ...item,
      product: product
    };
  }).filter(item => item.product);
}

function getCartTotal() {
  const cartDetails = getCartWithDetails();
  return cartDetails.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
}

function updateCartItemQuantity(productId, quantity) {
  const product = products.find(p => p.id === productId);
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (!item) return;
  
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  if (product && product.stock && quantity > product.stock) {
    alert("Only " + product.stock + " units available in stock.");
    item.quantity = product.stock;
  } else {
    item.quantity = quantity;
  }
  
  saveCart(cart);
  updateCartCount();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

function clearCart() {
  localStorage.removeItem('canoyAgrivitCart');
  updateCartCount();
}
