const express = require('express');
const router = express.Router();
const axios = require('axios');

// Function to generate unique identifier for products
const generateUniqueId = (product) => {
    return `${product.productName}-${product.price}-${product.rating}`;
};

// GET /categories/:categoryname/products
router.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { top = 10, minPrice, maxPrice, page = 1, sort = 'price', order = 'asc' } = req.query;  
  
    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products`, {
        params: { top, minPrice, maxPrice, page, sort, order }
        });

        let products = response.data;

        // Filter by price range
        if (minPrice) {
        products = products.filter(product => product.price >= minPrice);
        }
        if (maxPrice) {
        products = products.filter(product => product.price <= maxPrice);
        }

        // Apply sorting
        products.sort((a, b) => {
        if (order === 'asc') {
            return a[sort] > b[sort] ? 1 : -1;
        } else {
            return a[sort] < b[sort] ? 1 : -1;
        }
        });

        // Generate unique IDs for the products
        products = products.map(product => {
        product.id = generateUniqueId(product);
        return product;
        });

        // Apply pagination
        const pageSize = parseInt(top, 10);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = products.slice(startIndex, endIndex);

        res.json(paginatedProducts);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET /categories/:categoryname/products/:productid
router.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products`);
        const product = response.data.find(prod => generateUniqueId(prod) === productid);

        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
  });
  
  module.exports = router;