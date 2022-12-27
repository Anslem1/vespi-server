const Category = require('../../models/Category')
const Post = require('../../models/Post')

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

exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec()
  const posts = await Post.find({})
    .select('_id username caption slug desc postImage category')
    .populate({ path: 'category', select: '_id name' }).exec()
  res.status(200).json({
    categories: createCategories(categories),
    posts
  })
}
