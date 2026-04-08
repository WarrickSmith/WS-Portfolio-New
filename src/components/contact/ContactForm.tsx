import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  EMAILJS_CONTACT_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  RECAPTCHA_SITE_KEY,
} from '../../config/env'
import { cn } from '../../lib/cn'
import FaIcon from '../common/FaIcon'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SUBMISSION_TIMEOUT_MS = 15000
const SUCCESS_RESET_DELAY_MS = 4000

type ContactFieldName = 'user_name' | 'user_email' | 'message'
type FormPhase =
  | 'empty'
  | 'filling'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error'
type InteractionPhase = Extract<FormPhase, 'empty' | 'filling' | 'validating'>
type SubmitPhase = Extract<FormPhase, 'submitting' | 'success' | 'error'>
type MessageTone = 'info' | 'success' | 'error'
type CaptchaStatus = 'idle' | 'verified' | 'expired' | 'error' | 'unavailable'

type FormValues = Record<ContactFieldName, string>
type FormErrors = Partial<Record<ContactFieldName, string>>
type TouchedFields = Record<ContactFieldName, boolean>
type FormMessage = {
  tone: MessageTone
  text: string
} | null

const initialValues: FormValues = {
  user_name: '',
  user_email: '',
  message: '',
}

const initialTouchedFields: TouchedFields = {
  user_name: false,
  user_email: false,
  message: false,
}

const fieldIds: Record<ContactFieldName, string> = {
  user_name: 'contact-name',
  user_email: 'contact-email',
  message: 'contact-message',
}

const fieldLabels: Record<ContactFieldName, string> = {
  user_name: 'Your name',
  user_email: 'Email address',
  message: 'Message',
}

const fieldMaxLengths: Record<ContactFieldName, number> = {
  user_name: 100,
  user_email: 254,
  message: 2000,
}

const hasAnyValue = (values: FormValues): boolean =>
  Object.values(values).some((value) => value.trim().length > 0)

const hasErrors = (errors: FormErrors): boolean =>
  Object.values(errors).some((value) => Boolean(value))

const getFirstErrorMessage = (errors: FormErrors): string | null => {
  const firstError = Object.values(errors).find(
    (value): value is string => Boolean(value)
  )

  return firstError ?? null
}

const validateField = (
  name: ContactFieldName,
  rawValue: string
): string | undefined => {
  const value = rawValue.trim()

  if (name === 'user_name') {
    return value ? undefined : 'Please enter your name.'
  }

  if (name === 'user_email') {
    if (!value) {
      return 'Please enter your email address.'
    }

    return EMAIL_REGEX.test(value)
      ? undefined
      : 'Please enter a valid email address.'
  }

  return value ? undefined : 'Please add a short message.'
}

const validateValues = (values: FormValues): FormErrors => {
  const nextErrors: FormErrors = {}

  ;(Object.keys(values) as ContactFieldName[]).forEach((fieldName) => {
    const error = validateField(fieldName, values[fieldName])

    if (error) {
      nextErrors[fieldName] = error
    }
  })

  return nextErrors
}

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const successResetTimerRef = useRef<number | null>(null)
  const submissionInFlightRef = useRef(false)

  const [values, setValues] = useState<FormValues>(initialValues)
  const [touchedFields, setTouchedFields] = useState<TouchedFields>(
    initialTouchedFields
  )
  const [errors, setErrors] = useState<FormErrors>({})
  const [interactionPhase, setInteractionPhase] =
    useState<InteractionPhase>('empty')
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase | null>(null)
  const [formMessage, setFormMessage] = useState<FormMessage>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>(
    RECAPTCHA_SITE_KEY ? 'idle' : 'unavailable'
  )

  useEffect(() => {
    return () => {
      if (successResetTimerRef.current !== null) {
        window.clearTimeout(successResetTimerRef.current)
      }
    }
  }, [])

  const phase: FormPhase = submitPhase ?? interactionPhase
  const inputsLocked = phase === 'submitting' || phase === 'success'
  const submitDisabled
    = inputsLocked || !captchaToken || captchaStatus === 'error'
      || captchaStatus === 'unavailable'

  const resetCaptcha = () => {
    recaptchaRef.current?.reset()
    setCaptchaToken(null)
    setCaptchaStatus(RECAPTCHA_SITE_KEY ? 'idle' : 'unavailable')
  }

  const clearSubmissionFeedback = () => {
    if (submitPhase !== null) {
      setSubmitPhase(null)
    }

    if (formMessage?.tone !== 'info') {
      setFormMessage(null)
    }
  }

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = event.target.name as ContactFieldName
    const nextValues = {
      ...values,
      [fieldName]: event.target.value,
    }

    setValues(nextValues)
    clearSubmissionFeedback()

    if (hasErrors(errors)) {
      setInteractionPhase('validating')
      return
    }

    setInteractionPhase(hasAnyValue(nextValues) ? 'filling' : 'empty')
  }

  const handleFieldBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = event.target.name as ContactFieldName
    const trimmedValue = event.target.value.trim()
    const nextValues = {
      ...values,
      [fieldName]: trimmedValue,
    }
    const nextTouchedFields = {
      ...touchedFields,
      [fieldName]: true,
    }
    const nextErrors = {
      ...errors,
    }
    const nextError = validateField(fieldName, trimmedValue)

    if (nextError) {
      nextErrors[fieldName] = nextError
    } else {
      delete nextErrors[fieldName]
    }

    setValues(nextValues)
    setTouchedFields(nextTouchedFields)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      setInteractionPhase('validating')
      setFormMessage({
        tone: 'info',
        text:
          getFirstErrorMessage(nextErrors)
          ?? 'Please review the highlighted fields before sending.',
      })
      return
    }

    setInteractionPhase(hasAnyValue(nextValues) ? 'filling' : 'empty')

    if (formMessage?.tone === 'info') {
      setFormMessage(null)
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    if (!token) {
      setCaptchaToken(null)

      if (captchaStatus === 'verified') {
        setCaptchaStatus('idle')
      }

      return
    }

    setCaptchaToken(token)
    setCaptchaStatus('verified')

    if (submitPhase === 'error') {
      setSubmitPhase(null)
    }

    if (formMessage && formMessage.tone !== 'success') {
      setFormMessage(null)
    }
  }

  const handleCaptchaExpired = () => {
    if (submitPhase === 'submitting') {
      return
    }

    setCaptchaToken(null)
    setCaptchaStatus('expired')
    setInteractionPhase(
      hasErrors(errors) ? 'validating' : hasAnyValue(values) ? 'filling' : 'empty'
    )
    setFormMessage({
      tone: 'info',
      text: 'Verification expired. Please complete the challenge again.',
    })
  }

  const handleCaptchaErrored = () => {
    setCaptchaToken(null)
    setCaptchaStatus('error')
    setSubmitPhase((currentPhase) =>
      currentPhase === 'submitting' ? 'error' : currentPhase
    )
    setFormMessage({
      tone: 'error',
      text:
        'Verification is temporarily unavailable. Please refresh and try again in a moment.',
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submissionInFlightRef.current) {
      return
    }

    if (successResetTimerRef.current !== null) {
      window.clearTimeout(successResetTimerRef.current)
      successResetTimerRef.current = null
    }

    const nextTouchedFields: TouchedFields = {
      user_name: true,
      user_email: true,
      message: true,
    }
    const nextErrors = validateValues(values)

    setTouchedFields(nextTouchedFields)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      setSubmitPhase(null)
      setInteractionPhase('validating')
      setFormMessage({
        tone: 'info',
        text:
          getFirstErrorMessage(nextErrors)
          ?? 'Please review the highlighted fields before sending.',
      })
      return
    }

    if (captchaStatus === 'unavailable' || captchaStatus === 'error') {
      setSubmitPhase('error')
      setFormMessage({
        tone: 'error',
        text:
          'Verification is temporarily unavailable. Please refresh and try again in a moment.',
      })
      return
    }

    if (!captchaToken) {
      setSubmitPhase(null)
      setInteractionPhase('validating')
      setFormMessage({
        tone: 'info',
        text:
          captchaStatus === 'expired'
            ? 'Verification expired. Please complete the challenge again.'
            : 'Please complete the verification challenge before sending your message.',
      })
      return
    }

    if (
      !formRef.current
      || !EMAILJS_SERVICE_ID
      || !EMAILJS_CONTACT_TEMPLATE_ID
      || !EMAILJS_PUBLIC_KEY
    ) {
      setSubmitPhase('error')
      setFormMessage({
        tone: 'error',
        text:
          'Message sending is temporarily unavailable. Please try again shortly or reach out directly by email.',
      })
      resetCaptcha()
      return
    }

    let timeoutId: number | null = null
    submissionInFlightRef.current = true

    try {
      setSubmitPhase('submitting')
      setFormMessage({
        tone: 'info',
        text: 'Sending your message...',
      })

      await Promise.race<void>([
        emailjs
          .sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_CONTACT_TEMPLATE_ID,
            formRef.current,
            EMAILJS_PUBLIC_KEY
          )
          .then(() => undefined),
        new Promise<void>((_, reject) => {
          timeoutId = window.setTimeout(() => {
            reject(new Error('Submission timed out'))
          }, SUBMISSION_TIMEOUT_MS)
        }),
      ])

      setSubmitPhase('success')
      setFormMessage({
        tone: 'success',
        text: 'Message sent. Thanks for reaching out.',
      })
      resetCaptcha()

      successResetTimerRef.current = window.setTimeout(() => {
        setValues(initialValues)
        setTouchedFields(initialTouchedFields)
        setErrors({})
        setInteractionPhase('empty')
        setSubmitPhase(null)
        setFormMessage(null)
        successResetTimerRef.current = null
      }, SUCCESS_RESET_DELAY_MS)
    } catch {
      setSubmitPhase('error')
      setFormMessage({
        tone: 'error',
        text:
          'Message sending failed. Please try again in a moment or reach out directly by email.',
      })
      resetCaptcha()
    } finally {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }

      submissionInFlightRef.current = false
    }
  }

  const captchaMessage
    = captchaStatus === 'error' || captchaStatus === 'unavailable'
      ? 'Verification is temporarily unavailable. Please refresh and try again in a moment.'
      : captchaStatus === 'expired'
        ? 'Verification expired. Please complete the challenge again.'
        : captchaToken
          ? 'Verification complete. Your message is ready to send.'
          : 'Complete the verification challenge to enable sending.'

  const submitButtonLabel = (() => {
    if (phase === 'submitting') {
      return 'Sending...'
    }

    if (phase === 'success') {
      return 'Message sent'
    }

    return 'Send message'
  })()

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      data-form-state={phase}
      className="flex flex-col gap-6"
    >
      <div className="space-y-3">
        <h3 className="text-callout font-medium text-text-accent">
          Send a message
        </h3>
        <p className="max-w-[56ch] text-body-sm text-text-secondary">
          Share a quick introduction, the role or project you have in mind, and
          any useful context. I will get back to you as soon as I can.
        </p>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={cn(
          'min-h-6 rounded-sm border px-4 py-3 text-body-sm',
          formMessage
            ? 'border-border-subtle bg-bg-card-hover'
            : 'border-transparent px-0 py-0',
          formMessage?.tone === 'success' && 'border-success/40 bg-success/10 text-success',
          formMessage?.tone === 'error' && 'border-error/40 bg-error/10 text-error',
          (!formMessage || formMessage.tone === 'info') && 'text-text-secondary'
        )}
      >
        {formMessage?.text ?? ''}
      </div>

      <div className="grid gap-4">
        {(
          [
            {
              name: 'user_name',
              type: 'text',
              icon: 'faUser',
              autoComplete: 'name',
            },
            {
              name: 'user_email',
              type: 'email',
              icon: 'faEnvelope',
              autoComplete: 'email',
            },
          ] as const
        ).map((field) => {
          const fieldError = errors[field.name]
          const fieldId = fieldIds[field.name]

          return (
            <div key={field.name} className="space-y-2">
              <label
                htmlFor={fieldId}
                className="text-body-sm font-semibold text-text-primary"
              >
                {fieldLabels[field.name]}
              </label>
              <div
                className={cn(
                  'flex min-h-11 items-start gap-3 rounded-radius-md border bg-bg-card px-4 py-3 transition-[border-color,box-shadow] duration-150',
                  fieldError
                    ? 'border-error/60 bg-error/5'
                    : 'border-border-subtle focus-within:border-border-accent focus-within:shadow-focus-ring'
                )}
              >
                <span aria-hidden="true" className="pt-1 text-text-secondary">
                  <FaIcon icon={field.icon} />
                </span>
                <input
                  id={fieldId}
                  type={field.type}
                  name={field.name}
                  value={values[field.name]}
                  maxLength={fieldMaxLengths[field.name]}
                  autoComplete={field.autoComplete}
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  disabled={inputsLocked}
                  aria-invalid={Boolean(fieldError)}
                  aria-describedby={fieldError ? `${fieldId}-error` : undefined}
                  className="w-full border-0 bg-transparent text-body text-text-primary outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:opacity-70"
                  placeholder={
                    field.name === 'user_name'
                      ? 'Jane Doe'
                      : 'jane@example.com'
                  }
                />
              </div>
              {fieldError && touchedFields[field.name] && (
                <p
                  id={`${fieldId}-error`}
                  className="text-body-sm text-[color:var(--color-error)]"
                >
                  {fieldError}
                </p>
              )}
            </div>
          )
        })}

        <div className="space-y-2">
          <label
            htmlFor={fieldIds.message}
            className="text-body-sm font-semibold text-text-primary"
          >
            {fieldLabels.message}
          </label>
          <div
            className={cn(
              'flex min-h-11 items-start gap-3 rounded-radius-md border bg-bg-card px-4 py-3 transition-[border-color,box-shadow] duration-150',
              errors.message
                ? 'border-error/60 bg-error/5'
                : 'border-border-subtle focus-within:border-border-accent focus-within:shadow-focus-ring'
            )}
          >
            <span aria-hidden="true" className="pt-1 text-text-secondary">
              <FaIcon icon="faComments" />
            </span>
            <textarea
              id={fieldIds.message}
              name="message"
              value={values.message}
              maxLength={fieldMaxLengths.message}
              rows={5}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              disabled={inputsLocked}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? `${fieldIds.message}-error` : undefined
              }
              className="w-full resize-y border-0 bg-transparent text-body text-text-primary outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:opacity-70"
              placeholder="A short note about the role, product, or project."
            />
          </div>
          {errors.message && touchedFields.message && (
            <p
              id={`${fieldIds.message}-error`}
              className="text-body-sm text-[color:var(--color-error)]"
            >
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {RECAPTCHA_SITE_KEY ? (
          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              theme="dark"
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaExpired}
              onErrored={handleCaptchaErrored}
            />
          </div>
        ) : (
          <div className="rounded-radius-md border border-error/40 bg-error/10 px-4 py-3 text-body-sm text-error">
            Verification is temporarily unavailable. Please refresh and try
            again in a moment.
          </div>
        )}

        <p
          role="status"
          aria-live="polite"
          className={cn(
            'text-body-sm',
            captchaStatus === 'verified'
              ? 'text-[color:var(--color-success)]'
              : captchaStatus === 'error' || captchaStatus === 'unavailable'
                ? 'text-[color:var(--color-error)]'
                : 'text-text-secondary'
          )}
        >
          {captchaMessage}
        </p>
      </div>

      <button
        type="submit"
        disabled={submitDisabled}
        aria-busy={phase === 'submitting'}
        className={cn(
          'inline-flex min-h-12 items-center justify-center rounded-sm border px-4 py-4 text-body-sm font-semibold transition-[border-color,background-color,color,box-shadow,opacity] duration-150 focus-visible:outline-none focus-visible:shadow-focus-ring',
          phase === 'success'
            ? 'border-success bg-success/10 text-success'
            : phase === 'error'
              ? 'border-error bg-error/10 text-error'
              : phase === 'submitting'
                ? 'border-info bg-info/10 text-info'
                : 'border-border-accent bg-accent-primary text-text-primary hover:opacity-90',
          submitDisabled && phase !== 'success' && 'cursor-not-allowed opacity-60'
        )}
      >
        {submitButtonLabel}
      </button>
    </form>
  )
}

export default ContactForm
