const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Function to generate unique identifier for products
const generateUniqueId = (product) => {
  return `${product.productName}-${product.price}-${product.rating}`;
};

// Load JSON data
const loadData = () => {
  const dataPath = './sampleMerchantStores.json';
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Function to assign unique IDs to products
const assignUniqueIds = (data) => {
  data.stores.forEach(store => {
    store.products = store.products.map(product => {
      product.id = generateUniqueId(product);
      return product;
    });
  });
  return data;
};

// Function to apply sorting
const applySorting = (products, sort, order) => {
  return products.sort((a, b) => {
    if (order === 'asc') {
      return a[sort] > b[sort] ? 1 : -1;
    } else {
      return a[sort] < b[sort] ? 1 : -1;
    }
  });
};

// GET /categories/:categoryname/products
router.get('/categories/:categoryname/products', (req, res) => {
  const { categoryname } = req.params;
  const { top = 10, minPrice, maxPrice, page = 1, sort = 'price', order = 'asc' } = req.query;
  let data = loadData();
  
  // Assign unique IDs
  data = assignUniqueIds(data);

  let products = [];

  // Collect products from all stores
  data.stores.forEach(store => {
    products = products.concat(store.products);
  });

  // Filter by price range
  if (minPrice) {
    products = products.filter(product => product.price >= minPrice);
  }
  if (maxPrice) {
    products = products.filter(product => product.price <= maxPrice);
  }

  // Apply sorting
  const validSortFields = ['price', 'rating', 'discount'];
  if (validSortFields.includes(sort)) {
    products = applySorting(products, sort, order);
  } else {
    // Default sorting by price if the sort field is invalid
    products = applySorting(products, 'price', 'asc');
  }

  // Apply pagination
  const pageSize = parseInt(top, 10);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  res.json(paginatedProducts);
});

// GET /categories/:categoryname/products/:productid
router.get('/categories/:categoryname/products/:productid', (req, res) => {
  const { categoryname, productid } = req.params;
  let data = loadData();
  
  // Assign unique IDs
  data = assignUniqueIds(data);

  let product;

  // Find the product by ID
  data.stores.forEach(store => {
    const foundProduct = store.products.find(prod => prod.id === productid);
    if (foundProduct) {
      product = foundProduct;
    }
  });

  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports = router;