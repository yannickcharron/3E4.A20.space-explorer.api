import mongoose from 'mongoose';
import httpErrors from 'http-errors';

export default (err, req, res, next) => {

    const error = {
        developerMessage: err.stack,
        userMessage: err.message,
    }

    if (httpErrors.isHttpError(err)) {
        error.status = err.status;
    } else {
        if (err.name === 'MongoError') {
            switch (err.code) {
                case 11000:
                    error.status = 409;
                    const property = Object.keys(err.keyValue)[0];
                    const value = err.keyValue[property];
                    error.userMessage = `La propriété ${property} avec la valeur ${value} ne respecte pas une contrainte d'unicité.`;
            }
        }

        if (err instanceof mongoose.Error.ValidationError) {
            error.status = 422;
            error.userMessage = err.message;
        } else if(err instanceof mongoose.Error.CastError) {
            if(err.kind === 'ObjectId') {
                error.status = 404;
                error.developerMessage = err.stack;
            }

        }

        //Catch all -> 500
        if (!error.status) {
            error.status = 500;
        }

    }

    error.moreInfo = `http://documentation/errors/${error.status}`;

    console.log(error.developerMessage);
    res.status(error.status).json(error);
}