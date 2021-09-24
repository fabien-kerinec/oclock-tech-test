let model = {}
model.collection = {}
model.resource = {}

model.resource.create = (req, res, next) => {
  return res.json({ response: 'test' })
}

module.exports = model
