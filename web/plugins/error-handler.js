import ErrorHandler from './errors'

export default (context, inject) => {
  inject('errorHandler', new ErrorHandler())
}
