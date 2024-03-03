import brandRoutes from "./brand/brand.routes.js"
import categoryRoutes from "./category/category.routes.js"
import productRoutes from "./products/products.routes.js"
import subCategoryRoutes from "./subCategory/subCategory.routes.js"


export const allRoutes = (app) =>{
    app.use("/api/v1/category",categoryRoutes)
    app.use("/api/v1/subcategory",subCategoryRoutes)
    app.use("/api/v1/brand",brandRoutes)
    app.use("/api/v1/product",productRoutes)
}