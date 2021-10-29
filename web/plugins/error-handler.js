import ErrorHandler from '~/assets/js/errors'

export default (context, inject) => {
  inject('errorHandler', new ErrorHandler())
}
