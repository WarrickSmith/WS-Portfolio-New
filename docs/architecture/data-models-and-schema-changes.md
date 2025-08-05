# Data Models and Schema Changes

### New Data Models

#### VisitorData Model

**Purpose:** Capture visitor information for email notifications
**Integration:** Used by new visitor tracking service

**Key Attributes:**

- ipAddress: string - Visitor's IP address from browser API
- userAgent: string - Browser user agent string
- timestamp: string - Visit timestamp in ISO format
- language: string - Browser language preference
- referrer: string - Document referrer if available

**Relationships:**

- **With Existing:** Integrates with existing EmailJS template system
- **With New:** Standalone model for visitor notifications

#### ConsolidatedProfile Model

**Purpose:** Replace separate Experience, Education, Skills sections
**Integration:** Replaces existing personalData structure

**Key Attributes:**

- summary: string - Consolidated professional summary
- coreCompetencies: string[] - Key technical and soft skills
- adaptabilityExamples: string[] - Evidence of learning agility
- yearsExperience: number - Total years of experience

**Relationships:**

- **With Existing:** Replaces personalData.experience, personalData.education, personalData.skills
- **With New:** Primary data source for consolidated summary component

### Schema Integration Strategy

**Database Changes Required:**

- **New Tables:** N/A - frontend data structures only
- **Modified Tables:** N/A - no database
- **New Indexes:** N/A - no database
- **Migration Strategy:** Data file refactoring in src/data/

**Backward Compatibility:**

- Preserve existing data file structure for portfolioData
- Maintain existing component interfaces during transition
