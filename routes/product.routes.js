const express = require("express");
const router = express.Router();
const {
  SearchFilterProduct,
  getProduct,
  addProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  getProductsbyAdmin,
  CreateReviews,
  getAllReviews,
  updateProductReviews,
  deleteProductReviews,
} = require("../controllers/product.controller");

//done
router.route("/addProduct").post(addProduct);

//DONE
router.route("/products").get(SearchFilterProduct);
//DONE
router
  .route("/product/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct);

//DONE
router.route("/admin/products").get(getProductsbyAdmin);

//DONE
router.route("/review/new").post(CreateReviews);
//DONE
router.route("/reviews").get(getAllReviews);
//DONE
router
  .route("/review/:id")
  .put(updateProductReviews)
  .delete(deleteProductReviews);

module.exports = router;
