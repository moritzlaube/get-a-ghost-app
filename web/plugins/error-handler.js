import ErrorHandler from '~/plugins/errors'

export default (context, inject) => {
  inject('errorHandler', new ErrorHandler())
}
