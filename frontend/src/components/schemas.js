import * as Yup from 'yup'

const ContactSchema = Yup.object().shape({
  fullName: Yup.string(),
  email: Yup.string()
    .email('El email no es válido')
    .required('Requerimos este campo para ponernos en contacto con vos'),
  message: Yup.string()
    .min(10, 'Ingresa un mensaje más largo por favor')
    .required('Dejanos un mensaje!'),
})

export {
  ContactSchema,
}