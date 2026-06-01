export const globalErrorHandler = (err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(err.statusCode || 500).json({
    success: err.success ?? false,
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
  });
};
