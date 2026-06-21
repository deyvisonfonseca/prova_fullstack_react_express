const xss = require('xss');

function sanitizeObject(data) {
  const sanitized = {};
  Object.keys(data).forEach((key) => {
    sanitized[key] = typeof data[key] === 'string' ? xss(data[key]) : data[key];
  });
  return sanitized;
}

function createCrudController(Model, resourceName) {
  return {
    async list(req, res) {
      const items = await Model.find().sort({ createdAt: -1 });
      return res.json(items);
    },
    async getById(req, res) {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: `${resourceName} não encontrado` });
      return res.json(item);
    },
    async create(req, res) {
      const item = await Model.create(sanitizeObject(req.body));
      return res.status(201).json(item);
    },
    async update(req, res) {
      const item = await Model.findByIdAndUpdate(req.params.id, sanitizeObject(req.body), {
        new: true,
        runValidators: true
      });
      if (!item) return res.status(404).json({ message: `${resourceName} não encontrado` });
      return res.json(item);
    },
    async remove(req, res) {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: `${resourceName} não encontrado` });
      return res.status(204).send();
    }
  };
}

module.exports = createCrudController;
