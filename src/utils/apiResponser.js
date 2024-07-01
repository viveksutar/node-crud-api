// const apiSuccess = (data, message = null, code = 200) => {
//   return (req, res) => {
//     res.status(code).json({
//       success: true,
//       message: message,
//       data: data,
//     });
//   };
// };

// const apiError = (message = null, data = null, code = 400) => {
//   return (req, res) => {
//     res.status(code).json({
//       success: false,
//       message: message,
//       data: data,
//     });
//   };
// };

// export { apiSuccess, apiError };

class Response {
  /**
   * Returns common standard for post/get request.
   *
   * Add status, message with response.
   *
   * @since   1.0.0
   * @access  public
   *
   *
   * @alias    commonResponse
   * @memberof CommonClass
   *
   *
   * @return {Json} status, message and response
   * @param {Object} res for http response
   * @param {Number} status for http response code
   * @param {String} message for http response message
   * @param {Object} responseData for http response data
   * @param [instance]
   */
  static successResponse(res, message, data = null, status = 200) {
    return res.status(status).send({
      success: true,
      message: message,
      data: data || [],
    });
  }
  static errorResponse(res, message="Something Went Wrong", data = null, status = 500) {
    return res.status(status).send({
      success: false,
      message: message,
      data: data || [],
    });
  }
}

export { Response };
