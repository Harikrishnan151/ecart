//logic for getting all-products from mongodb

// import product collection
const products = require('../models/productSchema')

//create a function for getting all-products
exports.getAllProducts=async(req,res)=>{
    //Get all from mongodb
    try{
         const allProducts = await products.find()
         res.status(200).json(allProducts) //response send back to client
    }
    catch(error){
         res.status(401).json(error)//error message send back to client

    }
}

//view particular product details
  exports.viewProduct=async(req,res)=>{
     //get product id from the request
     const id = req.params.id;
     try{
          //check if product id is present in the db
          const product = await products.findOne({id})
           if(product){
               res.status(200).json(product)
           }else{
               res.status(404).json("product not found")
           }
     }
     catch(error){
          res.status(401).json(error)
     }
  }