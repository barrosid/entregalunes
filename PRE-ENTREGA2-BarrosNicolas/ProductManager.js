import { promises as fs, constants } from "fs"; 

async function main() {
    const p1 = new ProductManager('package.json');
}

const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !stock || !code || !thumbnail) {
      console.log('Some data is missing');
      return;
    }

    const isCodeRepeat = this.products.some((p) => p.code === code);
    if (isCodeRepeat) {
      console.log('Code already used');
      return;
    }

    const id = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
    const newProduct = { id, title, description, price, thumbnail, code, stock };
    this.products.push(newProduct);
    this.saveProducts();
    console.log('Product added');
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log('Product not found');
    }
    return product;
  }

  async updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log('Product not found');
      return;
    }

    this.products[index] = { id, ...updatedProduct };
    this.saveProducts();
    console.log('Product updated');
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log('Product not found');
      return;
    }

    this.products.splice(index, 1);
    this.saveProducts();
    console.log('Product deleted');
  }
}

module.exports = ProductManager;

// consola
async function main() {
  const manager = new ProductManager('productos.json');

  await manager.addProduct('Paty', 'hamburguesa', 1500, 'https://...', 'paty40459', 25);
  await manager.addProduct('Vienissima', 'salchicha', 1000, 'https://...', 'vieni40450', 50);

  console.log(await manager.getProducts());
  console.log(await manager.getProductById(1));

  await manager.updateProduct(1, {
    title: 'Nueva Paty',
    price: 1600,
  });

  console.log(await manager.getProducts());

  await manager.deleteProduct(1);

  console.log(await manager.getProducts());
}

main();