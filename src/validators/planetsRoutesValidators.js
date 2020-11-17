import expressValidator from 'express-validator';

const { body } = expressValidator;

class PlanetsRoutesValidators {
    //https://github.com/validatorjs/validator.js#validators
    //https://express-validator.github.io/docs/index.html
    putValidator() {
        
        return [
            body('name').exists().withMessage('Requis'),
            body('discoveredBy').exists().withMessage("Requis"),
            body('discoveryDate').exists().withMessage('Requis').bail()
                    .isISO8601().withMessage('doit être une date').bail()
                    .isBefore().withMessage('doit être dans le passé'),
            body('temperature').exists().withMessage('Requis').bail()
                .isNumeric().withMessage('doit être numérique'),
            body('satellites').exists().isArray(),
            body('position.x').exists().withMessage('x doit exister').bail().isFloat({ min: -1000, max: 1000 }).withMessage('x doit être float'),
            body('position.y').exists().withMessage('y doit exister').bail().isFloat({ min: -1000, max: 1000 }).withMessage('y doit être float'),
            body('position.z').exists().withMessage('z doit exister').bail().isFloat({ min: -1000, max: 1000 }).withMessage('z doit être float'),
        ];
    }

    patchValidator() {
        
    }
}

export default new PlanetsRoutesValidators();
