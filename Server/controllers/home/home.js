const ProductCategory = require('../../models/productCategory');
const Product = require('../../models/product');

const getNestedCategories = (categories, parentId = null) => {
  return categories
    .filter(cat => String(cat.parentCategory?._id || '') === String(parentId || ''))
    .map(cat => ({
      id: cat._id,
      name: cat.name,
      imageUrl: cat.imageUrl,
      subcategories: getNestedCategories(categories, cat._id),
      products: [],
    }));
};

const getParentCategoriesWithProducts = async () => {
  return ProductCategory.aggregate([
    { $match: { parentCategory: null } },
    {
      $lookup: {
        from: 'productcategories',
        localField: '_id',
        foreignField: 'parentCategory',
        as: 'subcategories'
      }
    },
    {
      $addFields: {
        subcategoryIds: { $map: { input: "$subcategories", as: "sub", in: "$$sub._id" } }
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'subcategoryIds',
        foreignField: 'category_id',
        as: 'products'
      }
    },
    {
      $project: {
        subcategoryIds: 0
      }
    }
  ]);
};

const getProductSummary = async () => {
  return Product.aggregate([
    {
      $group: {
        _id: "$category_id",
        totalProducts: { $sum: 1 },
        avgPrice: { $avg: "$price" }
      }
    }
  ]);
};

const getHome = async (req, res) => {
  try {
    const allCategories = await ProductCategory.find().populate('parentCategory').lean();
    const categoryIds = allCategories.map(cat => cat._id);
    const allProducts = await Product.find({ category_id: { $in: categoryIds } }).lean();

    const productMap = allProducts.reduce((acc, prod) => {
      const catId = prod.category_id.toString();
      if (!acc[catId]) acc[catId] = [];
      acc[catId].push({
        id: prod._id,
        name: prod.name,
        imageUrl: prod.imageUrl,
        price: prod.price,
        discount: prod.discount,
      });
      return acc;
    }, {});

    let categoryTree = getNestedCategories(allCategories);

    const attachProducts = (categories) => {
      return categories.map(cat => ({
        ...cat,
        products: productMap[cat.id] || [],
        subcategories: attachProducts(cat.subcategories),
      }));
    };

    categoryTree = attachProducts(categoryTree);

    const productSummaries = await getProductSummary();
    const parentCategoryWithProducts = await getParentCategoriesWithProducts();

    res.status(200).json({
      success: true,
      message: "Home data fetched successfully",
      data: {
        category: categoryTree,
        subCategory: allProducts,
        parentCategoryWithProducts,
        productSummaries
      }
    });
  } catch (err) {
    console.error("Error in getHome:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCategoryProducts = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await ProductCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    let products = [];
    let subcategories = [];

    if (!category.parentCategory) {
      subcategories = await ProductCategory.find({ parentCategory: categoryId }).lean();

      const subCatIds = subcategories.map((sc) => sc._id);
      products = await Product.find({ category_id: { $in: subCatIds } }).lean();
    } else {
      products = await Product.find({ category_id: categoryId }).lean();
    }

    const formattedProducts = products.map((prod) => ({
      _id: prod._id,
      name: prod.name,
      price: prod.price,
      imageUrl: prod.imageUrl,
      discount: prod.discount,
    }));

    res.status(200).json({
      success: true,
      message: "Category details fetched",
      data: {
        categoryName: category.name,
        subcategories,
        products: formattedProducts,
      },
    });
  } catch (err) {
    console.error("Error in getCategoryProducts:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const buildCategoryTree = (categories, parentId = null) => {
  return categories
    .filter(cat => String(cat.parentCategory?._id || '') === String(parentId || ''))
    .map(cat => ({
      id: cat._id,
      name: cat.name,
      imageUrl: cat.imageUrl,
      subcategories: buildCategoryTree(categories, cat._id),
    }));
};

const getCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find().populate("parentCategory").lean();

    const nestedCategories = buildCategoryTree(categories);

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: {
        flat: categories.map(cat => ({
          _id: cat._id,
          name: cat.name,
          imageUrl: cat.imageUrl,
          parentCategory: cat.parentCategory ? cat.parentCategory._id : null
        })),
        nested: nestedCategories
      }
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

module.exports = {
  getHome,
  getCategoryProducts,
  getCategories
};
