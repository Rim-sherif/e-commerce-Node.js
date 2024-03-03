import subCategoryModel from "../../../../dataBase/models/subCategory.model.js";
import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";

//add subCategory
const addsubCategory =handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    req.body.image = req.file.filename
    let presubCategory = new subCategoryModel(req.body);
    let addedsubCategory = await presubCategory.save()
    res.json({message:"Added",addedsubCategory})
});

//get all subcategories
const getAllsubCategories = handelError(async(req,res)=>{
    let allsubCategories = await subCategoryModel.find()
    res.json({message:"Done",allsubCategories})
});

//get all categoriesby id
const getAllsubCategoriesById =handelError( async(req,res)=>{
    let subCategory = await subCategoryModel.findById(req.params.id);
    res.json({message:"Done",subCategory})
});

//update subCategory
const updatesubCategory = handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    let updatedsubCategory = await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedsubCategory  && res.json({message:"Done",updatedsubCategory})
    !updatedsubCategory && res.json({message:"not found",updatedsubCategory})
})

//delete subCategory
const deletesubCategory = handelError(async(req,res) =>{
    let deletedsubCategory = await subCategoryModel.findByIdAndDelete(req.params.id,req.body,{new:true});
    deletedsubCategory  && res.json({message:"Delete",deletedsubCategory})
    !deletedsubCategory && res.json({message:"not found",deletedsubCategory})
})


export { addsubCategory,getAllsubCategories,getAllsubCategoriesById,updatesubCategory,deletesubCategory}