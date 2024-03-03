import productsModel from "../../../../dataBase/models/products.model.js";
import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";

//add product
const addproduct = handelError(async (req, res) => {
  console.log(req.files);
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((ele) => ele.filename);
  let preproduct = new productsModel(req.body);
  let addedproduct = await preproduct.save();
  res.json({ message: "Added", addedproduct });
});

//get all product
const getAllproduct = handelError(async (req, res) => {
  // pagination
  let page = req.query.page * 1 || 1;
  if (req.query.page <= 0) page = 1;
  let skip = (page - 1) * 4;
  //filter
  let filterObje = req.query;
  let exculedQuery = ["page", "sort", "keyword", "fields"];
  exculedQuery.forEach((ele) => {
    delete filterObje[ele];
  });
  let allproduct = await productsModel.find(filterObje).skip(skip).limit(4);
  res.json({ message: "Done", page, allproduct });
});

//get all productby id
const getAllproductById = handelError(async (req, res) => {
  let product = await productsModel.findById(req.params.id);
  res.json({ message: "Done", product });
});

//update product
const updateproduct = handelError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  if (req.files.imageCover)
    req.body.imageCover = req.files.imageCover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((ele) => ele.filename);
  let updatedproduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updatedproduct && res.json({ message: "Done", updatedproduct });
  !updatedproduct && res.json({ message: "not found", updatedproduct });
});

//delete product
const deleteproduct = deleteOne(productsModel);

export {
  addproduct,
  getAllproduct,
  getAllproductById,
  updateproduct,
  deleteproduct,
};
