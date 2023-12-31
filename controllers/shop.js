const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  Product.fetchAll().then(([rows]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: "/products"
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: 'Edit Text',
        path: "/products"
      })
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: "/"
      });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: [],
      });
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const prodPrice = req.body.productPrice;
  // Written by Maximillian
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price)
  // });
  // Cart.addProduct(prodId, prodPrice);
  res.redirect('/cart')
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart')
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders',
    {
      path: '/orders',
      pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
};
