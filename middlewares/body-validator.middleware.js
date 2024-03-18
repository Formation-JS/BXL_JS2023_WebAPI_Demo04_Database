import { ObjectSchema } from 'yup';

/**
 * Body Validator middleware
 * @param { ObjectSchema } yupValidator 
 * @param { number } errorCode 
 */
export const bodyValidatorMiddleware = (yupValidator, errorCode = 422) => {

    /**
     * Middlware
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next 
     */
    return async (req, res, next) => {

        // Si pas de données dans le body de la requete -> Erreur 400
        if(Object.keys(req.body).length === 0) {
            res.status(400).json({
                errorMessage: 'No request body'
            });
            return;
        }

        try {
            // Validation des données du body
            const validateData = await yupValidator.noUnknown().validate(req.body, { abortEarly: false });

            // Injection des données validées dans l'objet "req"
            req.validateData = validateData;

            // Appel de la méthode "Next" du middleware
            next();
        }
        catch (yupError) {
            console.log('Error Yup');
            console.log(yupError);

            console.log('Custom error');
            const requestErrors = {};
            for(const {path, errors} of yupError.inner) {
                requestErrors[path] = errors.join(', ');
            }

            res.status(errorCode)
                .json({
                    errorMessage: 'Invalid request body',
                    errors: requestErrors
                });
        }
    }
}