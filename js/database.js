class Database {
  constructor() {
    this.dbName = 'CanoyAgrivitDB';
    this.version = 1;
    this.db = null;
  }
  
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains('products')) {
          const productStore = db.createObjectStore('products', { keyPath: 'id' });
          productStore.createIndex('category', 'category', { unique: false });
          productStore.createIndex('name', 'name', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('cart')) {
          db.createObjectStore('cart', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('orders')) {
          const orderStore = db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
          orderStore.createIndex('date', 'date', { unique: false });
        }
      };
    });
  }
  
  async addProducts(products) {
    const tx = this.db.transaction(['products'], 'readwrite');
    const store = tx.objectStore('products');
    
    for (let product of products) {
      store.put(product);
    }
    
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve();
    });
  }
  
  async getAllProducts() {
    const tx = this.db.transaction(['products'], 'readonly');
    const store = tx.objectStore('products');
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async getProductsByCategory(category) {
    const tx = this.db.transaction(['products'], 'readonly');
    const store = tx.objectStore('products');
    const index = store.index('category');
    const request = index.getAll(category);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async saveCart(cartItems) {
    const tx = this.db.transaction(['cart'], 'readwrite');
    const store = tx.objectStore('cart');
    
    // Clear existing cart
    store.clear();
    
    for (let item of cartItems) {
      store.put({ id: item.id, quantity: item.quantity });
    }
    
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve();
    });
  }
  
  async getCart() {
    const tx = this.db.transaction(['cart'], 'readonly');
    const store = tx.objectStore('cart');
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async saveOrder(order) {
    const tx = this.db.transaction(['orders'], 'readwrite');
    const store = tx.objectStore('orders');
    const request = store.add({
      ...order,
      date: new Date().toISOString()
    });
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async getOrders() {
    const tx = this.db.transaction(['orders'], 'readonly');
    const store = tx.objectStore('orders');
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

const db = new Database();
