const categoriesModel = require('../../models/categories');

exports.get_categories = (req, res, next) => {
    categoriesModel.find().then((category) => {
        const response = {
            count: category.length,
            
            categorylist: category 
        }
        res.status(200).json({response})
      }).catch((error) => {
        res.status(500).send(error);
      });
};