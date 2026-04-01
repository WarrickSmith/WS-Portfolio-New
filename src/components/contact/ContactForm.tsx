import { useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'
import { EMAILJS_CONTACT_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, RECAPTCHA_SITE_KEY } from '../../config/env'
import { cn } from '../../lib/cn'
import FaIcon from '../common/FaIcon'

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null)
  const [sendStatus, setSendStatus] = useState('')
  const [captchaValid, setCaptchaValid] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValid(Boolean(value))
  }

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!captchaValid) {
      return
    }

    if (
      !form.current ||
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_CONTACT_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY
    ) {
      setSendStatus('ERROR - SENDING EMAIL!')
      return
    }

    setSendStatus('SENDING EMAIL...')

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          form.current?.reset()
          setSendStatus('EMAIL SENT!')
          recaptchaRef.current?.reset()
        },
        () => {
          setSendStatus('ERROR - SENDING EMAIL!')
          recaptchaRef.current?.reset()
        }
      )
  }

  const handleInputFocus = () => {
    setSendStatus('')
    setCaptchaValid(false)
  }

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="flex flex-col items-center"
    >
      <h3 className="mt-0 mb-spacing-3 text-callout font-medium text-text-accent">
        FEEL FREE TO DROP ME A NOTE
      </h3>
      <p className="mb-spacing-3 text-supporting font-normal text-text-primary">
        If you have any suggestions, job opportunities, project or even you
        want to say Hello.. please fill out the form below and I will reply you
        shortly.
      </p>
      <span className="flex w-full items-center">
        <FaIcon icon="faUser" className="text-text-primary" />
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          onFocus={handleInputFocus}
          className="m-4 w-full border-0 border-b border-border-subtle bg-bg-card px-4 py-4 text-supporting font-normal text-text-primary outline-none focus:border-border-accent"
        />
      </span>
      <span className="flex w-full items-center">
        <FaIcon icon="faEnvelope" className="text-text-primary" />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          onFocus={handleInputFocus}
          className="m-4 w-full border-0 border-b border-border-subtle bg-bg-card px-4 py-4 text-supporting font-normal text-text-primary outline-none focus:border-border-accent"
        />
      </span>
      <span className="flex w-full items-center">
        <FaIcon icon="faComments" className="text-text-primary" />
        <textarea
          name="message"
          placeholder="Your Comment"
          rows={1}
          required
          onFocus={handleInputFocus}
          className="m-4 w-full border-0 border-b border-border-subtle bg-bg-card px-4 py-4 text-supporting font-normal text-text-primary outline-none focus:border-border-accent"
        />
      </span>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={onCaptchaChange}
      />
      <input
        disabled={!captchaValid}
        type="submit"
        value={sendStatus ? sendStatus.toUpperCase() : 'SEND MESSAGE'}
        className={cn(
          'm-4 w-full rounded-radius-sm bg-accent-primary px-4 py-4 text-supporting font-bold text-text-primary',
          'hover:cursor-pointer',
          sendStatus === 'SENDING EMAIL...' &&
            'pointer-events-none border-2 border-info bg-bg-card text-text-accent opacity-50',
          sendStatus === 'EMAIL SENT!' &&
            'border-2 border-green-400 bg-bg-card text-green-400',
          sendStatus === 'ERROR - SENDING EMAIL!' &&
            'border-2 border-red-400 bg-bg-card text-red-400',
          !captchaValid && 'pointer-events-none opacity-50'
        )}
      />
    </form>
  )
}

export default ContactForm
