const express = require("express");
const router = express.Router();
const {Product} = require("../Models/product");
const { Category } = require("../Models/category");
router.get("/", async(req,res)=>{
       const productList = await Product.find()
       if(!productList){
              res.status(500).json(sucess=false);
       }
       res.send(productList);
})
router.get("/count",async (req,res)=>{
    const countProduct = await Product.countDocuments();
    if(!countProduct){
        res.status(500).json(sucess=false);

    }
    res.send({productCount:countProduct});
})
router.get("/get/featured",async (req,res)=>{
    const featured = await Product.find({isFeatured:true});
    if(!featured){
        res.status(500).json(sucess=false);
    }
    res.send(featured);
})
router.get("/:id",async (req,res)=>{
    const product = await Product.findById(req.params.id).populate("category");
    res.send(product);
})

router.put("/:id",async (req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category){
        res.status(500).send("category not found");
    }
    const putProduct = await Product.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
    },{new:true})
    res.status(200).send(putProduct);
})
router.delete("/:id",async (req,res)=>{
    const delProduct = await Product.findByIdAndDelete(req.params.id);
    if(!delProduct){
        return res.status(500).send("Product not found");
    }
    res.status(200).json(delProduct);
})
router.post("/", async (req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category){
        return res.status(400).send("Inavlid Category");
    }
    try {
        // Log this to see if data is actually arriving!
        console.log("Incoming Data:", req.body);

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch(err) {
        console.error("Save Error:", err);
        res.status(500).json({ success: false});
    }
});

module.exports = router;