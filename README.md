# SaaS Dashboard Starter

Production-ready SaaS dashboard with comprehensive Playwright test suite.

## What's Inside

**Application** (`/app`)
- React + TypeScript + Tailwind CSS
- Authentication flow (login/logout)
- Dashboard with real-world widgets
- Settings with form validation
- Dark mode support

**Test Suite** (`/tests`)
- E2E tests for user flows
- Form validation tests
- Accessibility tests (WCAG 2.1 AA)

## Quick Start

```bash
# Install dependencies
npm install
cd app && npm install && cd ..

# Install browsers
npx playwright install

# Run tests
npm test
```

## Project Structure

```
├── app/                    # React application
│   ├── src/
│   │   ├── components/     # StatCard, DataTable, Alerts...
│   │   ├── pages/          # Login, Dashboard, Settings
│   │   └── layouts/        # Sidebar layout
│   └── ...
│
├── tests/
│   ├── e2e/                # User flow tests
│   │   ├── auth.spec.ts    # Can users log in/out?
│   │   └── dashboard.spec.ts
│   │
│   ├── forms/              # Validation tests
│   │   ├── login-validation.spec.ts
│   │   └── settings-validation.spec.ts
│   │
│   └── accessibility/      # WCAG compliance
│       └── a11y.spec.ts
│
└── playwright.config.ts
```

## Test Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test:e2e` | User flow tests only |
| `npm run test:forms` | Form validation only |
| `npm run test:a11y` | Accessibility only |
| `npm run test:headed` | Watch tests run |
| `npm run test:ui` | Interactive UI mode |
| `npm run report` | Open HTML report |

## What Each Test Category Validates

### E2E Tests (`/tests/e2e`)
> "Can a user complete the main flows?"

- Login with valid credentials
- Protected route access
- Navigation between pages
- Data display and interaction
- Logout

### Form Tests (`/tests/forms`)
> "Do we validate input correctly?"

- Required field validation
- Email format validation
- Password requirements
- Error message display
- Loading states
- Success feedback

### Accessibility Tests (`/tests/accessibility`)
> "Do we meet WCAG 2.1 AA?"

- No critical axe-core violations
- Keyboard navigation
- Form labels and ARIA
- Screen reader support
- Focus management

## Configuration Highlights

```typescript
// playwright.config.ts
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:5173',
  reuseExistingServer: !process.env.CI,
}

// Auto-starts the app before tests
// Reuses dev server locally, fresh in CI
```

## Tech Stack

- **App**: Vite, React 19, TypeScript, Tailwind CSS 4
- **Tests**: Playwright, axe-core
- **CI**: GitHub Actions (multi-browser)

## Development

```bash
# Start app
npm run dev

# Run specific test file
npx playwright test tests/e2e/auth.spec.ts

# Debug a test
npx playwright test --debug

# Generate test code
npx playwright codegen http://localhost:5173
```

## Author

**Ana Flavia Roca Rojas** - Senior QA Engineer
5+ years in e-commerce, B2B platforms, and microservices.

[LinkedIn](https://linkedin.com/in/ana-flavia-roca-rojas/)
