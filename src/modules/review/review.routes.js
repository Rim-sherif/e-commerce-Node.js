import express from 'express';
import { addreview,deletereview,getAllreview, getAllreviewById, updatereview } from './controller/review.controller.js';


const reviewRouter = express.Router();


reviewRouter.route("/")
    .post(addreview)
    .get(getAllreview)


    reviewRouter.route("/:id")
    .get(getAllreviewById)
    .patch(updatereview)
    .delete(deletereview)








export default reviewRouter;