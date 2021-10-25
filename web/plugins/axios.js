export default ({ $axios, $notify }) => {
  $axios.onError((error) => {
    if (error.response === undefined) {
      // Display a flash notification
      $notify({
        title: 'Network Error',
        text: "You're offline. Please connect and reload.",
        type: 'error',
      })

      throw error
    }

    // Handle other types of errors
    throw error
  })
}
