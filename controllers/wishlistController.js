//logic for wishlist

//import wishlist model
const wishlists = require('../models/wishlistSchema');
// const wistlist = require('../models/wishlistSchema')

//logic for add wishlist
 exports.addToWishlist=async(req,res)=>{
    //get product details
    //destructuring
    const{id,title,price,image}= req.body;
    //logic
    try{
    //check if the product already present in the wishlist
    const item =await wishlists.findOne({id})
    if(item){
        res.status(403).json("product is already available in wishlist")
    }else{
        //add new product to the wishlist
        const newProduct= new wishlists({id,title,price,image})
        //to store new product in the wishlist
        await newProduct.save()
        //send response back to the client
        res.status(200).json("product added successfully")
    }
    }
    catch(error){
        res.status(401).json(error)
    }
 }

 //get all wishlist products
 exports.getWishlistItem=async(req,res)=>{
    //logic 
    try{
       const allWishlist=await wishlists.find()
       res.status(200).json(allWishlist)
    }
    catch(error){
        res.status(404).json(error)
    }

 }

 //delete a particular item from cart
 exports.deleteProduct=async(req,res)=>{
   //logic - get id - then delete item - then fetch remaining item
   //get id from path parameter
   const{id}=req.params

   try{
     const removedProduct=await wishlists.deleteOne({id})
     //get  remaining product details after deleting a particular product
     if(removedProduct){
        const allItems=await wishlists.find()
        res.status(200).json(allItems)
     } 
   }
   catch(error){
    res.status(404).json(error)
   }

    
}