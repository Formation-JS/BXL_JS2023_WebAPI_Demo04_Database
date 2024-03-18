import * as yup from 'yup';

export const actorValidator = yup.object().shape({
    firstname: yup.string()
                    .typeError('Le prénom est invalide')
                    .trim()
                    .required('Le prénom est obligatoire')
                    .min(2, 'Le prénom doit faire minimum 2 lettres')
                    .max(50, 'Le prénom doit faire maximum 50 lettres'),
    lastname: yup.string()
                    .typeError('Le nom est invalide')
                    .trim()
                    .required('Le nom est obligatoire')
                    .min(2, 'Le nom doit faire minimum 2 lettres')
                    .max(50, 'Le nom doit faire maximum 50 lettres'),
    birthdate: yup.date()
                    .typeError('Le date est invalide')
});