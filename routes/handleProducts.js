const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /categories/:categoryname/products
router.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { top, minPrice, maxPrice, page = 1, sort, order } = req.query;
  
  try {
    const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products`, {
      params: { top, minPrice, maxPrice, page, sort, order }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET /categories/:categoryname/products/:productid
router.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;
    
    try {
      const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products/${productid}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  module.exports = router;