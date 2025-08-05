import emailjs from '@emailjs/browser'
const sendEmail = (button: string) => {
  const message = 'Someone has clicked through to your GITHUB Repos!'

  // Get user's IP address
  const ipAddress = window?.location?.hostname || 'Unknown IP Address'

  // Get other user information
  const userAgent = navigator.userAgent || 'Unknown User Agent'
  const language = navigator.language || 'Unknown Language'

  const templateParams = {
    user_name: 'Warrick',
    notes: `${message}\n\nIP Address: ${ipAddress}\nUser Agent: ${userAgent}\nLanguage: ${language}`,
  }

  emailjs
    .send(
      'service_ee860nu',
      'template_y0g26q6',
      templateParams,
      '3HyPrrduysCbj5IZK'
    )
    .then(
      function (response) {
        return
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
  return
}
export default sendEmail
