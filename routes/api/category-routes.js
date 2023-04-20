// Import necessary dependencies
const router = require('express').Router();
const { Category, Product } = require('../../models');

// Define the '/api/categories' endpoint

// Retrieve all categories, including associated products
router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attribute: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Retrieve a single category by its id, including associated products
router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attribute: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'no category found' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a category by its id
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'no catergoy found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a category by its id
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'no category found' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Export the router for use in other parts of the application
module.exports = router;
