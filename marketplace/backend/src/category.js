const db = require('./db');

exports.getCategories = async (req, res) => {
  let categories;
  if (Object.keys(req.query).length === 0) {
    categories = await db.selectCategory();
  } else {
    categories = await db.selectCategory(req.params.category);
  }
  if (categories.length === 0) {
    res.status(404).send();
  }
  res.status(200).json(categories);
};
