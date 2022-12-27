const Category = require('../../models/Category')
const slugify = require('slugify')

function createCategories (categories, parentId = null) {
  const categoryList = []
  let category
  if (parentId == null) {
    category = categories.filter(cat => cat.parentId == undefined)
  } else {
    category = categories.filter(cat => cat.parentId == parentId)
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      categoryImage: cate.categoryImage,
      categoryDesc: cate.categoryDesc,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id)
    })
  }
  return categoryList
}

// CREATE A CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
      categoryImage: req.body.categoryImage,
      categoryDesc: req.body.categoryDesc
    }
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId
    }

    const cat = new Category(categoryObj)
    cat.save((err, category) => {
      if (err) return res.status(500).json(err)
      if (category) return res.status(200).json(category)
    })
  } catch (err) {
    return res.status(500).json(err)
  }
}

//GET A CATEGORY
exports.getCategory = (req, res) => {
  try {
    Category.find({}).exec((err, categories) => {
      if (err) return res.status(500).json(err)
      if (categories) {
        const categoryList = createCategories(categories)
        return res.status(200).json({ categoryList: categoryList })
      }
    })
  } catch (err) {
    return res.status(400).json(err)
  }
}
