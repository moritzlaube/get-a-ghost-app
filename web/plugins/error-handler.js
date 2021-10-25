import ErrorHandler from './Errors'

export default (context, inject) => {
  inject('errorHandler', new ErrorHandler())
}
