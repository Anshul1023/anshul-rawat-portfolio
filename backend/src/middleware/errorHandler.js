export function errorHandler(error, _request, response, _next) {
  console.error(error);

  return response.status(error.statusCode || 500).json({
    success: false,
    message: error.publicMessage || "Something went wrong while processing the request."
  });
}

