import { Router } from "express";
import productControllers from "../module/controller/productControllers";
const productRoute: Router = Router()

productRoute.post("/create-product", productControllers.createProduct)
productRoute.get("/get-products", productControllers.getProducts)
productRoute.get("/get-product/:id", productControllers.getProduct)
productRoute.put("/update-product/:id", productControllers.updateProduct)
productRoute.delete("/delete-product/:id", productControllers.deleteProduct)

export default productRoute