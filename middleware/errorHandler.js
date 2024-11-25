const errorHandler = (error, req, res, next) => {
  return res.status().send(error.message)
}
