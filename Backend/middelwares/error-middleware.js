const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
    } else if (err.name === 'CastError') {
        statusCode = 400;
    } else if (err.code === 11000) {
        statusCode = 400;
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
    }

    // Log the error for debugging purposes
    console.error(err);
    
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorMiddleware;
