const categoriesModel = require('../../models/categories');

exports.get_categories = (req, res, next) => {
    categoriesModel.find().then((category) => {
      res.status(200).json(category);
      }).catch((error) => {
        res.status(500).send(error);
      });
};