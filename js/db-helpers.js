async function initDatabase() {
  try {
    await db.init();
    const existingProducts = await db.getAllProducts();
    if (existingProducts.length === 0) {
      await db.addProducts(products);
      console.log('Products loaded into database');
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

async function getCartFromDB() {
  try {
    const cartItems = await db.getCart();
    return cartItems;
  } catch {
    return [];
  }
}

async function saveCartToDB(cartItems) {
  try {
    await db.saveCart(cartItems);
  } catch (error) {
    console.error('Failed to save cart to database:', error);
  }
}

async function saveOrderToDB(orderData) {
  try {
    const orderId = await db.saveOrder(orderData);
    return orderId;
  } catch (error) {
    console.error('Failed to save order:', error);
    throw error;
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  await initDatabase();
});
