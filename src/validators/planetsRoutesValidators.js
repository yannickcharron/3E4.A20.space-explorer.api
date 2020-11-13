import expressValidator from 'express-validator';

const { body } = expressValidator;

class PlanetsRoutesValidators {
    //https://github.com/validatorjs/validator.js#validators
    //https://express-validator.github.io/docs/index.html
    putValidator() {
        
        return [
            body('name').exists().withMessage('Le nom de la planète est obligatoire'),
            body('discoveredBy').exists().withMessage("Le nom de l'explorateur est obligatoire"),
            body('discoveryDate').exists().isDate().withMessage('La date de découverte est obligatoire'),
            body('temperature').exists().withMessage('La température est obligatoire'),
            body('temperature').isNumeric().withMessage('La température doit être numérique'),
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
