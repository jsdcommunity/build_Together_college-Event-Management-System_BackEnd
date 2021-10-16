class ErrorResponse extends Error {
  statusCode;
  code;
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.code = errorCode;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorResponse);
    }
  }
}

module.exports = ErrorResponse;
