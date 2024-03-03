import productsModel from "../../../../dataBase/models/products.model.js";
import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";

//add product
const addproduct =handelError(async(req,res) =>{
    console.log(req.files);
    req.body.slug = slugify(req.body.title);
    // req.body.image = req.file.filename
    let preproduct = new productsModel(req.body);
    let addedproduct = await preproduct.save()
    res.json({message:"Added",addedproduct})
});

//get all product
const getAllproduct = handelError(async(req,res)=>{
    let allproduct = await productsModel.find()
    res.json({message:"Done",allproduct})
});

//get all productby id
const getAllproductById =handelError( async(req,res)=>{
    let product = await productsModel.findById(req.params.id);
    res.json({message:"Done",product})
});

//update product
const updateproduct = handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    if(req.file) req.body.logo = req.file.filename
    let updatedproduct = await productsModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedproduct  && res.json({message:"Done",updatedproduct})
    !updatedproduct && res.json({message:"not found",updatedproduct})
})

//delete product
const deleteproduct = handelError(async(req,res) =>{
    let deletedproduct = await productsModel.findByIdAndDelete(req.params.id,req.body,{new:true});
    deletedproduct  && res.json({message:"Delete",deletedproduct})
    !deletedproduct && res.json({message:"not found",deletedproduct})
})


export { addproduct,getAllproduct,getAllproductById,updateproduct,deleteproduct}