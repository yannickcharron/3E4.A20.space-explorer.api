import expressValidator from 'express-validator';
const { matchedData, validationResult } = expressValidator;

export default (req, res, next) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        req.matchedData = matchedData(req);
        return next(); // Redirection vers ma route
    }

    //Nous avons des erreurs de validation
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    const error = {
        status : 422,
        developerMessage: extractedErrors,
        userMessage: `Erreur de validation de données`,
        moreInfo : `http://documentation/errors/${error.status}`
    }

    return res.status(422).json(error);
}