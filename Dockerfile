# Use Node.js 22
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Accept build arguments for environment variables
ARG API_URL
ARG EMAILJS_SERVICE_ID
ARG EMAILJS_TEMPLATE_ID
ARG EMAILJS_CONTACT_TEMPLATE_ID
ARG EMAILJS_PUBLIC_KEY
ARG RECAPTCHA_SITE_KEY
ARG DEBUG_VISITOR_TRACKING

# Set environment variables for build
ENV API_URL=$API_URL
ENV EMAILJS_SERVICE_ID=$EMAILJS_SERVICE_ID
ENV EMAILJS_TEMPLATE_ID=$EMAILJS_TEMPLATE_ID
ENV EMAILJS_CONTACT_TEMPLATE_ID=$EMAILJS_CONTACT_TEMPLATE_ID
ENV EMAILJS_PUBLIC_KEY=$EMAILJS_PUBLIC_KEY
ENV RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY
ENV DEBUG_VISITOR_TRACKING=$DEBUG_VISITOR_TRACKING

# Build the application
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]