# WS-Portfolio-New — Component Inventory

## Layout And Orchestration

### `src/components/MainPage.tsx`

- Owns expanded-card state
- Prevents interaction on cards `1` and `2`
- Renders preview cards and expanded overlays

### `src/components/VisitorTracker.tsx`

- Non-visual component
- Starts visitor tracking only when `ENABLE_VISITOR_TRACKING` is enabled

## Common Components

### `src/components/common/Card.tsx`

- Framer Motion wrapper for each card
- Switches into fullscreen overlay layout when `opened`

### `src/components/common/CardGrid.tsx`

- Responsive grid container for the six-card desktop layout and stacked mobile/tablet variants

### `src/components/common/DimmedBackdrop.tsx`

- Full-screen backdrop behind expanded content

### `src/components/common/CloseButton.tsx`

- Fixed close control for expanded cards

### `src/components/common/GoldPulseText.tsx`

- Shared gold-accent text treatment for preview cards

### `src/components/common/SectionHeading.tsx`

- Shared section heading for expanded content panels

### `src/components/common/WordSlider.tsx`

- Animated rotating text used by the name card

### `src/components/common/BulletPoints.tsx`

- Portfolio project tile with image and hover-detail treatment

### `src/components/common/FaIcon.tsx`

- FontAwesome icon adapter

### `src/components/common/renderChildDiv.tsx`

- Maps card IDs to expanded content components
- Exports the card preview configuration list

## Feature Components

### `src/components/namecard/NameCard.tsx`

- Static introduction card for Warrick Smith
- Uses `WordSlider` for the subtitle rotation

### `src/components/about/AboutCard.tsx`

- Preview card for the About section

### `src/components/about/AboutContent.tsx`

- Expanded profile view
- Renders personal details, GitHub link, experience, education, skills, and learning adaptability

### `src/components/portfolio/PortfolioCard.tsx`

- Preview card for the portfolio section

### `src/components/portfolio/PortfolioContent.tsx`

- Expanded project gallery
- Renders portfolio items from `src/data/portfolioData.tsx`
- Exposes proof-to-skills reverse navigation actions inside project cards

### `src/components/approach/ApproachCard.tsx`

- Preview card for the approach section

### `src/components/approach/ApproachContent.tsx`

- Expanded methodology and adaptability view
- Renders structured approach copy and learning-adaptability examples

### `src/components/contact/ContactCard.tsx`

- Preview card for the contact section

### `src/components/contact/ContactContent.tsx`

- Expanded contact layout
- Combines contact copy with the form component

### `src/components/contact/ContactForm.tsx`

- EmailJS-backed contact form
- Uses reCAPTCHA and status-driven submit button states
