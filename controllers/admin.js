const Cart = require('../models/cart');
const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  };
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(([row]) => {
      if (!row) {
        return res.redirect('/admin/products');
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/add-product",
        editing: editMode,
        product: row[0]
      });
    });;
};

exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedImageUrl = req.body.imageUrl;
  const updatedProductt = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice)
  updatedProductt.updateProduct(prodId);
  res.redirect('/admin/products')
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows]) => {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: "/admin/products"
    });
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteProduct(prodId)
  res.redirect('/admin/products')
};