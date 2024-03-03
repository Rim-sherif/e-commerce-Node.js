import categoryModel from "../../../../dataBase/models/category.model.js";
import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";

//add category
const addCategory =handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    req.body.image = req.file.filename
    let preCategory = new categoryModel(req.body);
    let addedCategory = await preCategory.save()
    res.json({message:"Added",addedCategory})
});

//get all categories
const getAllCategories = handelError(async(req,res)=>{
    let allCategories = await categoryModel.find()
    res.json({message:"Done",allCategories})
});

//get all categoriesby id
const getAllCategoriesById =handelError( async(req,res)=>{
    let Category = await categoryModel.findById(req.params.id);
    res.json({message:"Done",Category})
});

//update category
const updateCategory = handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedCategory  && res.json({message:"Done",updatedCategory})
    !updatedCategory && res.json({message:"not found",updatedCategory})
})

//delete category
const deleteCategory = handelError(async(req,res) =>{
    let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id,req.body,{new:true});
    deletedCategory  && res.json({message:"Delete",deletedCategory})
    !deletedCategory && res.json({message:"not found",deletedCategory})
})


export { addCategory,getAllCategories,getAllCategoriesById,updateCategory,deleteCategory}