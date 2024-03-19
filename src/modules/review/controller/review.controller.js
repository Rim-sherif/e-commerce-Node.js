import reviewModel from "../../../../dataBase/models/reviews.model.js";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";

//add review
const addreview =handelError(async(req,res) =>{
    let prereview = new reviewModell(req.body);
    let addedreview = await prereview.save()
    res.json({message:"Added",addedreview})
});

//get all review
const getAllreview = handelError(async(req,res)=>{
    let allreview = await reviewModel.find()
    res.json({message:"Done",allreview})
});

//get all reviewby id
const getAllreviewById =handelError( async(req,res)=>{
    let review = await reviewModel.findById(req.params.id);
    res.json({message:"Done",review})
});

//update review
const updatereview = handelError(async(req,res) =>{
    let updatedreview = await reviewModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedreview  && res.json({message:"Done",updatedreview})
    !updatedreview && res.json({message:"not found",updatedreview})
})

//delete review
const deletereview = deleteOne(reviewModel)

export { addreview,getAllreview,getAllreviewById,updatereview,deletereview}