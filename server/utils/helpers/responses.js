const errorResponse = (response, status, responseError) => 
{
    response.json(
    {
      status,
      message: responseError,
    });
  };
  const successResponse = (response, status, responseMessage, results = null) => 
  {
    response.json(
    {
      status,
      message: responseMessage,
      results,
    });
  };
  
  const emptyResponse = (response, status) => 
  {
    response.status(status).json({});
  };
  module.exports = { errorResponse, successResponse, emptyResponse };