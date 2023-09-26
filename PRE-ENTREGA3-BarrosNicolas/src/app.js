const express = require('express');
const ProductManager = require('./ProductManager'); 
const app = express();
const port = 8080; 


const productManager = new ProductManager('package.json'); 


app.use(express.json());


app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});


app.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));
    
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});


app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});