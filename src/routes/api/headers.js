const headers = function apiHeaders({ res, next }) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'X-Filename, Link',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Platform, multipart/form-data',
    'Content-Type': 'application/json ',
    'X-Robots-Tag': 'noindex',
    'X-Powered-By': 'MMD_Preview v.0',
    'X-Api-Version': 0,
  })
  return next()
}

module.exports = headers
