const errorHandler = (err, req, res, next) =>{
    const statusCode = err.name === 'MulterError'
        ? 400
        : (res.statusCode >= 400 ? res.statusCode : 500)

    const message = err.code === 'LIMIT_FILE_SIZE'
        ? 'Image must be 10 MB or smaller'
        : err.message

    res.status(statusCode)

    res.json({
        message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export default  errorHandler
