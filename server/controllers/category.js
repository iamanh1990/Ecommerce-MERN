const Category = require('../models/category');
const slugify = require('slugify');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(
  async (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  },
  'from create category',
  400,
  'Create category failed'
);

// exports.create = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const category = await new Category({ name, slug: slugify(name) }).save();
//     res.json(category);
//   } catch (error) {
//     console.log('from create category', error);
//     res.status(400).json({ err: 'create category failed' });
//   }
// };

exports.read = catchAsync(
  async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) throw Error('No such category found');
    res.json(category);
  },
  'Error from category read controller',
  400,
  'read category failed'
);

exports.list = catchAsync(
  async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.json(categories);
  },
  'Error from category list controller',
  400,
  'read category failed'
);

exports.remove = catchAsync(
  async (req, res) => {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) throw Error('No such category found');
    res.json(deleted);
  },
  'Error from category delete controller',
  400,
  'delete category failed'
);
exports.update = catchAsync(
  async (req, res) => {
    const { name } = req.body;
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!updated) throw Error('No such category found');
    res.json(updated);
  },
  'Error from category update controller',
  400,
  'update category failed'
);