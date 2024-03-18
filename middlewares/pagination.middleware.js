const defaultOptions = {
    defaultLimit: 10,
    maxLimit: 100
};

/**
 * Pagination middleware
 * @param {{defaultLimit: number?, maxLimit: number?}?} options
 */
export const paginationMiddleware = (options) => {

    // Fusion des options reçus du middleware avec les valeurs par defaut
    const { defaultLimit, maxLimit } = { ...defaultOptions, ...options };

    // Erreur si les valeurs sont incohérentes
    if(defaultLimit <= 0 || maxLimit <= 0) {
        throw new Error('Bad options in paginationMiddleware');
    }

    /**
     * Middlware
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next 
     */
    return async (req, res, next) => {
        // Récuperation du "offset" et "limit" de la requete « /?limit=100000 »
        const userOffset = parseInt(req.query.offset);
        const userLimit = parseInt(req.query.limit);

        // Définir la valeur d'offset et de limit "validé"

        //? - Si "userOffset" est un nombre positif, on le prend
        //?   Sinon on prend la valeur "0"
        const offset = (!isNaN(userOffset) && userOffset > 0) ? userOffset : 0;

        //? - Si "userLimit" est un nombre positif, on le compare avec "maxLimit" et on prend le plus petit des deux
        //?   Sinon on prend la valeur "defaultLimit"
        const limit = (!isNaN(userLimit) && userLimit > 0) ? Math.min(userLimit, maxLimit) : defaultLimit;

        // Injection des données de pagination dans l'objet "req"
        req.pagination = {
            offset,
            limit
        };

        // Appel de la méthode "Next" du middleware
        next();
    };
}