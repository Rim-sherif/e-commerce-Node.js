import { handelError } from "../../middelware/handelError.js";



export const deleteOne = (model) => {
    return handelError(async(req,res) =>{
        let deletedsubCategory = await model.findByIdAndDelete(req.params.id,req.body,{new:true});
        deletedsubCategory  && res.json({message:"Delete",deletedsubCategory})
        !deletedsubCategory && res.json({message:"not found",deletedsubCategory})
    })
    
}