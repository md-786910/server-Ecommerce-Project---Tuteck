const db = require("../models");
const { Op } = require('sequelize');
const Product = db.product;
const Review = db.reviews;

// Search and filter products
const SearchFilterProduct = async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      page,
      limit
    } = req.query;
    console.log(req.query);

    // Build the filters object
    const filters = {};

    if (search) {
      filters.title = {
        [Op.iLike]: `%${search}%`,
      };
    }

    if (minPrice) {
      filters.price = {
        ...filters.price,
        [Op.gte]: minPrice,
      };
    }

    if (maxPrice) {
      filters.price = {
        ...filters.price,
        [Op.lte]: maxPrice,
      };
    }



    // Build the sort options
    let sortOptions = [];
    if (sortBy) {
      const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
      sortOptions = [[sortBy, order]];
    }

    // Calculate pagination parameters
    const currentPage = parseInt(page) || 1;
    const limitPerPage = parseInt(limit) || 10;
    const offset = (currentPage - 1) * limitPerPage;


    // Perform the database query
    const { rows: products, count: totalItems } = await Product.findAndCountAll({
      where: filters,
      order: sortOptions,
      limit: limitPerPage,
      offset: offset,
    });

    const totalPages = Math.ceil(totalItems / limitPerPage);

    res.status(200).json({
      products,
      totalItems,
      totalPages,
      currentPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//end of search , filter product api ------->


//add product--------------------------->
const addProduct = async (req, res) => {
  try {

    const createprod = await Product.create({
      title: req.body.title,
      description: req.body.description,

    });
    res.status(201).json({
      data: createprod,
      status: true,
      message: "product added successfully",
    });
  } catch (error) {
    // console.log(error);

    res.status(401).json({ status: false, message: error.message });
  }
};
//end of addproduct----------------->

//get all products------------------->
const getProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.status(201).json({
      data: product,
      status: "success",
      message: "product fetch successfully",
    });
  } catch (error) {
    res.status(401).json({ status: false, message: error.message });
  }
};
//end of all products ----------------->

//get product by Id--------------------->
const getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const Findproduct = await Product.findOne({
      where: { id: id }
    });

    if (!Findproduct) {
      return res.status(400).json({
        success: false,
        message: "Product not Found"
      })
    }

    //if all ok
    res.status(200).json({
      success: true,
      productDetails: Findproduct
    })
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message
    })
  }
}
//end of product by id------------>

// Delete one Product-------------->
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const Findproduct = await Product.findOne({
      where: { id: id }
    });

    if (!Findproduct) {
      return res.status(400).json({
        success: false,
        message: "Product not Found"
      })
    }
    // if all ok 
    if (Findproduct) {
      await Findproduct.destroy(); // deletes the row
    }

    res.status(200).json({
      success: true,
      message: "product delete successfully !"
    })

  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message
    })

  }
}
//end of delete product ---------------->

//update a productDetails--------------->

const updateProduct = async (req, res) => {

  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const Findproduct = await Product.findOne({
      where: { id: id }
    });

    if (!Findproduct) {
      return res.status(400).json({
        success: false,
        message: "Product not Found"
      })
    }
    // if all ok
    const updatedProduct = await Product.update(
      {
        title: title,
        description: description,

      },
      { returning: true, where: { id: id } }
    )

    //return respose
    res.status(200).json({
      success: true,
      message: "Product updated successfully !",
      updateProduct: updatedProduct
    })

  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message
    })
  }

}
//end of update product -------- >

//get All Product by admin -------->
const getProductsbyAdmin = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.status(201).json({
      data: product,
      status: "success",
      message: "All products fetch successfully by Admin",
    });
  } catch (error) {
    res.status(401).json({ status: false, message: error.message });
  }
};

//end of all product by admin --------->

//create reviews on product ------------>
const CreateReviews = async (req, res) => {

  try {
    const { productId, userId, rating, comment } = req.body;

    const review = await Review.create({
      userId,
      productId,
      rating,
      comment,
    });

    res.status(200).json({
      success: true,
      message: "Review created successfully ",
      review: review
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}
//end of create Reviews --------->


// get all products review 
const getAllReviews = async (req, res) => {

  try {
    const reviews = await Review.findAll();

    res.status(200).json({
      success: true,
      message: "Review fetch successfully ",
      review: reviews
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}


//end of all product review

// update reviews---------------->
const updateProductReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await Review.findOne({
      where: { id: id }
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully ",
      review: review
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


//end of update reviews------------->


//delete reviews--------------->
const deleteProductReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.destroy();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


//end of delete reviews------------->

module.exports = {
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

};
