//To define routes for client request

//1 import express 
const express = require('express')

//4 import product controller
const productController = require('../controllers/productController')
//import wishlist controller
const wislistController = require('../controllers/wishlistController')
//import cart controller
const cartController = require('../controllers/cartController')

//2 using express create object for router class inorder to setup path
const router = new express.Router()

//3 use router object to resolve clint request

   //get all products api request
   router.get('/products/all-products',productController.getAllProducts)


   //get particular product
   router.get('/products/view-product/:id',productController.viewProduct)

   //add a new product to wishlist
   router.post('/wishlists/add-to-wishlist',wislistController.addToWishlist)

   //view all wishlist items
   router.get('/wishlists/view-all-wishlist',wislistController.getWishlistItem)
   
   //delete a particular product from wishlist
   router.delete('/wishlists/delete-wishlist-product/:id',wislistController.deleteProduct)

   //add to cart
   router.post('/carts/add-to-cart',cartController.addToCart)

   //get cart products
   router.get('/carts/get-cart',cartController.getCart)

  //delete product from cart
  router.delete('/carts/delete-cart-product/:id',cartController.deleteCartProduct)

   //increment the cart quantity
   router.get('/cart/increment-product/:id',cartController.incrementProductCount)

  //decrement product quantity
   router.get('/cart/decrement-product/:id',cartController.decrementProductCount)


//export routes

module.exports=router