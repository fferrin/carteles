import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('El email no es válido')
    .required('Ingrese su email'),
  password: Yup.string()
    .required('Ingrese su contraseña')
    .min(8, 'El password debe tener como mínimo 8 caracteres'),
})

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('El email no es válido')
    .required('Ingresa tu email'),
  password: Yup.string()
    .required('Ingresa tu contraseña')
    .min(8, 'El password debe tener como mínimo 8 caracteres'),
  repeatPassword: Yup.string().test(
    'passwords-match',
    'Los passwords no coinciden',
    function (value) {
      console.log(this.parent.password, value)
      return this.parent.password === value
    }
  ),
})

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('El email no es válido')
    .required('Requerimos este campo para que puedas reiniciar tu contraseña'),
})

const ContactSchema = Yup.object().shape({
  email: Yup.string()
    .email('El email no es válido')
    .required('Requerimos este campo para ponernos en contacto con vos'),
  subject: Yup.string(),
  // .min(10, 'Ingresa un asunto más largo por favor')
  // .required('Dejanos un asunto!'),
  message: Yup.string()
  // .min(10, 'Ingresa un mensaje más largo por favor')
  // .required('Dejanos un mensaje!'),
})

export {
  LoginSchema,
  SignUpSchema,
  ForgotPasswordSchema,
  ContactSchema,
}