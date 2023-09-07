import { useRef, useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import styled, { css } from 'styled-components'
import FaIcon from '../common/FaIcon'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: var(--fs-sm);
    color: var(--color-alt);
    font-weight: 500;
    margin-top: 0;
  }

  p {
    font-size: var(--fs-xsm);
    color: var(--color);
    font-weight: 400;
    margin: 0 0 1rem 0;
  }
`

const InputBox = styled.span`
  display: flex;
  align-items: center;
  width: 100%;

  .fa-icon {
    font-size: var(--fs-xsm);
  }
`

const Input = styled.input`
  background-color: var(--bg-color-alt);
  border: none;
  border-bottom: var(--border-style);
  font-size: var(--fs-xsm);
  color: var(--color);
  font-weight: 400;
  margin: 1rem;
  padding: 1rem;
  width: 100%;

  :focus {
    outline: none;
    border-bottom: var(--border-style-alt);
  }
`

const TextArea = styled.textarea`
  background-color: var(--bg-color-alt);
  border: none;
  border-bottom: var(--border-style);
  font-size: var(--fs-xsm);
  color: var(--color);
  font-weight: 400;
  margin: 1rem;
  padding: 1rem;
  width: 100%;

  :focus {
    outline: none;
    border-bottom: var(--border-style-alt);
  }
`

const SubmitButton = styled.input<{ status: string }>`
  background-color: var(--color-alt);
  border-radius: 0.75rem;
  font-size: var(--fs-xsm);
  color: var(--color);
  font-weight: 700;
  margin: 1rem;
  padding: 1rem;
  width: 100%;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.status === 'SENDING EMAIL...' &&
    css`
      color: dodgerblue;
      background-color: var(--bg-color-alt);
      border: 2px solid dodgerblue;
    `}

  ${(props) =>
    props.status === 'EMAIL SENT!' &&
    css`
      color: green;
      background-color: var(--bg-color-alt);
      border: 2px solid green;
    `}

  ${(props) =>
    props.status === 'ERROR - SENDING EMAIL!' &&
    css`
      color: red;
      background-color: var(--bg-color-alt);
      border: 2px solid red;
    `}
`

const FormText = () => {
  return (
    <>
      <h3>FEEL FREE TO DROP ME A NOTE</h3>
      <p>
        If you have any suggestions, job opportunities, project or even you want
        to say Hello.. please fill out the form below and I will reply you
        shortly.
      </p>
    </>
  )
}

export const ContactMe = () => {
  const form = useRef<HTMLFormElement>(null)
  const [sendStatus, setSendStatus] = useState<string>('')

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSendStatus('SENDING EMAIL...')

    emailjs
      .sendForm(
        'service_ee860nu',
        'template_4o1vz8c',
        form.current!,
        '3HyPrrduysCbj5IZK'
      )
      .then(
        (result) => {
          console.log(result.text)
          form.current?.reset()
          setSendStatus('EMAIL SENT!')
        },
        (error) => {
          console.log(error.text)
          setSendStatus('ERROR - SENDING EMAIL!')
        }
      )
  }

  const handleInputFocus = () => {
    setSendStatus('')
  }

  return (
    <Form ref={form} onSubmit={sendEmail}>
      <FormText />
      <InputBox>
        <FaIcon icon={'faImagePortrait'} className="fa-icon" />
        <Input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          onFocus={handleInputFocus}
        />
      </InputBox>
      <InputBox>
        <FaIcon icon={'faEnvelope'} className="fa-icon" />
        <Input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          onFocus={handleInputFocus}
        />
      </InputBox>
      <InputBox>
        <FaIcon icon={'faComments'} className="fa-icon" />
        <TextArea
          name="message"
          placeholder="Your Comment"
          rows={1}
          required
          onFocus={handleInputFocus}
        />
      </InputBox>
      <SubmitButton
        type="submit"
        value={sendStatus ? sendStatus.toUpperCase() : 'SEND MESSAGE'}
        status={sendStatus}
      />
    </Form>
  )
}

export default ContactMe
