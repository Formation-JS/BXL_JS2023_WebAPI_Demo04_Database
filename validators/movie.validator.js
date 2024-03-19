import * as yup from 'yup';

export const movieValidator = yup.object().shape({
    title: yup.string()
            .typeError('Le titre est invalide')
            .trim()
            .required('Le titre est obligatoire')
            .max(100, 'Le titre ne peux pas faire plus de 100 caracteres'),
    releaseYear: yup.number()
            .typeError('L\'année de sortie est invalide'),
    duration: yup.number()
            .typeError('La durée est invalide')
            .positive('La durée doit être un nombre positif'),
    hasSubtitle: yup.boolean()
            .typeError('La valeur "hasSubtitle" est invalide'),
    genre: yup.string()
            .typeError('Le genre est invalide')
            .trim()
            .required('Le genre est obligatoire')
            .max(50, 'Le genre ne peux pas faire plus de 50 caracteres'),
    tags: yup.array().of(yup.string().min(2))
});