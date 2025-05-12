// const express = require('express');
// const router = express.Router();
// const productController = require('../contollers/productController');

// router.get('/', productController.getAllProducts);
// router.post('/', productController.addProduct);
// router.put('/:id', productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);
// router.post('/order', productController.orderProduct);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// // @route   POST /api/products
// // @desc    Add a new product
// router.post('/', async (req, res) => {
//   try {
//     const { name, price, quantity } = req.body;

//     if (!name || price == null || quantity == null) {
//       return res.status(400).json({ error: 'Please provide all product details' });
//     }

//     const product = new Product({ name, price, quantity });
//     await product.save();

//     res.status(201).json({ message: 'Product added successfully', product });
//   } catch (error) {
//     console.error('Error saving product:', error);
//     res.status(500).json({ error: 'Server error while adding product' });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch products' });
//   }
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../contollers/product');

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

router.post('/order', productController.orderProduct);


module.exports = router;


