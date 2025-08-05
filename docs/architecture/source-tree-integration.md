# Source Tree Integration

### Existing Project Structure

```
src/
├── components/
│   ├── box3/
│   │   ├── Box3Content.tsx
│   │   ├── cellContent/
│   │   │   ├── Cell4.tsx         # To be replaced
│   │   │   ├── Experience.tsx    # To be removed
│   │   │   ├── Education.tsx     # To be removed
│   │   │   └── Skills.tsx        # To be removed
│   ├── box5/
│   │   └── ContactForm.tsx       # Preserved
│   └── common/
│       └── sendEmail.tsx         # Extended
└── data/
    └── personalData.tsx          # Modified
```

### New File Organization

```
src/
├── components/
│   ├── box3/
│   │   ├── cellContent/
│   │   │   └── ConsolidatedSummary.tsx     # New unified summary component
│   └── common/
│       └── visitorTracker.tsx              # New visitor tracking service
└── data/
    └── consolidatedProfile.tsx             # New consolidated data model
```

### Integration Guidelines

- **File Naming:** Follow existing PascalCase for components, camelCase for utilities
- **Folder Organization:** Maintain existing box-based component structure
- **Import/Export Patterns:** Use existing ES6 import/export patterns with TypeScript
