import React, { useState } from 'react'
import styled from 'styled-components'

// https://www.geeksforgeeks.org/how-to-send-an-email-from-javascript/

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Send form content using SMTP email
  }

  return (
    <FormContainer>
      <h6 className="uppercase m-none font-weight-700">
        Feel free to drop me a line
      </h6>
      <p className="second-font">
        If you have any suggestions, job opportunities, projects, or if you just
        want to say Hello... please fill out the form below and I will reply to
        you shortly.
      </p>
      <form className="contactform" onSubmit={handleSubmit}>
        <div className="input-field second-font">
          <i className="fa fa-user prefix"></i>
          <input
            id="name"
            name="name"
            type="text"
            className="validate"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="font-weight-400" htmlFor="name">
            Your Name
          </label>
        </div>
        <div className="input-field second-font">
          <i className="fa fa-envelope prefix"></i>
          <input
            id="email"
            type="email"
            name="email"
            className="validate"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Your Email</label>
        </div>
        <div className="input-field second-font">
          <i className="fa fa-comments prefix"></i>
          <textarea
            id="comment"
            name="comment"
            className="materialize-textarea"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <label htmlFor="comment">Your Comment</label>
        </div>
        <div
          className="g-recaptcha"
          data-sitekey="YOUR_RECAPTCHA_SITE_KEY"
        ></div>
        <br />
        <div className="submit-form">
          <button className="btn font-weight-700" type="submit" name="send">
            Send Message <i className="fa fa-send"></i>
          </button>
        </div>
        <div className="form-message">
          <span className="output_message center-align font-weight-700 uppercase">
            {message}
          </span>
        </div>
      </form>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  /* Add your custom styling here */
`

export default ContactForm
