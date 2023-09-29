// //logic for carts


// //import carts model
// const carts = require('../models/cartSchema')

// //add to cart
// exports.addToCart = async(req,res)=>{
//     //get products details from the request
//     const {id,title,price,image} =req.body// destructuring
//     //logic
//     try{
//      //check the product if already in the cart
//      const products = await carts.findOne({id})
//      if(products){
//         //products is present in the cart, update quantity and price accordingly
//         products.quantity+=1

//         //update the grand total
//         products.grandtotal=products.price*products.quantity

//         //save changes
//         products.save()

//         //send response back to the clint
//         res.status(200).json("Product details updated") //response send back to client
//      }else{
//         //product is not present in the cart, then add product to the cart
//         const newProduct =new carts({
//             id,title,image,quantity,grandTotal:price
//         })
//         //save new product details
//         newProduct.save()

//          //send response back to the clint
//          res.status(200).json("Product added successfully") //response send back to client
//      }
//     }  
//     catch(error){
//         res.status(401).json(error)
//     }

// }

//import carts model
const carts = require('../models/cartSchema')

//add to cart collection
exports.addToCart = async(req,res)=>{
    //get products details from the request
    const {id,title,price,image,quantity} = req.body

    //logic
    try{
        //check if the product is already in cart
        const products = await carts.findOne({id})
        if(products){
            //product is present in cart, update the quantity and price accordingly
            products.quantity+=1

            //update the grandtotal 
            products.grandTotal=products.price*products.quantity

            //save changes
            products.save()

            //send response back to the client
            res.status(200).json("Product details updated")

        }
        else{
            //products is not present in the cart, Add product to cart
            const newProduct = new carts({
                id,title,price,image,quantity,grandTotal:price
            })

            //save new product details
            newProduct.save()

            //send response back to client
            res.status(200).json("Product added successfully")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}
//get cart product
exports.getCart =async(req,res)=>{
  
    //logic
     try{
         const allcart=await carts.find()
         res.status(200).json(allcart) //cart products details
 
     }
     catch(error){
         res.status(404).json(error)
 
   }
 }

 //delete an item from cart
 exports.deleteCartProduct=async(req,res)=>{
   //get id from path parameter
   const{id}=req.params
   //remove product from cart
   try{
        const removeProduct=await carts.deleteOne({id})
         //get  remaining product details after deleting a particular product
     if(removeProduct.deleteCount!=0){
        //get all remaining products from cart
        const allProducts=await carts.find()
        res.status(200).json(allProducts)//response send back to client
     } 
   }
   catch(error){
    res.status(404).json(error)
   }
 }

 //increment the cart product count
 exports.incrementProductCount = async(req,res)=>{

    //find product id
    const{id}=req.params
        //if product already exist in the cartthen quantity will be incremented by 1
        //then update grand total
    try{
        const product=await carts.findOne({id})
            if(product){
                product.quantity+=1 //increment the quantity by 1
                product.grandTotal=product.price*product.quantity
                //save changes to the db
               await product.save()
                //after the product has been saved , update the content into the client side
                const allCart=await carts.find()
                res.status(200).json(allCart)
            }else{
                res.status(401).json("product not found")
            }
     

    }catch(error){
        res.status(404).json(error)
    }
 }

 //decrement cart product count
 exports.decrementProductCount= async(req,res)=>{
    //find product id
    const{id}=req.params
      //if product already exist in the cart then quantity will be decremented by 1
      //then update grand total
      try{
        const product=await carts.findOne({id})
        if(product){
            product.quantity-=1//decremented quantity by 1
            if(product.quantity==0){
                //remove product from cart
                await carts.deleteOne({id})
                //remaining products will be send back to client
                const allCart = await carts.find()
                res.status(200).json(allCart)
            }else{
                product.grandTotal=product.price*product.quantity
                //save changes to the db
               await product.save()
                //after the product has been saved , update the content into the client side
                const allCart=await carts.find()
                 res.status(200).json(allCart)
            }
           
        }else{
            res.status(401).json("product not found")
        }

      }catch(error){
        res.status(404).json(error)
      }
 }