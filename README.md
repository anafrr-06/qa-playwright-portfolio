# QA Playwright Portfolio

Production-ready SaaS dashboard with comprehensive Playwright test suite (172 tests).

## What's Inside

**Application** (`/app`)
- React + TypeScript + Tailwind CSS 4
- Authentication flow (login/logout with modal confirmation)
- Dashboard: stats, activity feed, alerts, data table with search/sort
- Settings with form validation
- Dark/Light mode toggle
- Toast notifications
- Responsive sidebar (collapsible on desktop, overlay on mobile)

**Test Suite** (`/tests`) - 172 tests
- E2E tests for user flows
- Form validation tests
- Accessibility tests (WCAG 2.1 AA)
- Responsive design tests

## Quick Start

```bash
npm install
cd app && npm install && cd ..
npx playwright install
npm test
```

## Project Structure

```
├── app/
│   ├── src/
│   │   ├── components/     # StatCard, DataTable, Modal, Toast...
│   │   ├── pages/          # Login, Dashboard, Settings
│   │   └── layouts/        # DashboardLayout (responsive sidebar)
│   └── ...
│
├── tests/
│   ├── e2e/
│   │   ├── auth.spec.ts
│   │   ├── dashboard.spec.ts
│   │   ├── modal.spec.ts
│   │   ├── theme.spec.ts
│   │   ├── toast.spec.ts
│   │   └── responsive.spec.ts
│   │
│   ├── forms/
│   │   ├── login-validation.spec.ts
│   │   └── settings-validation.spec.ts
│   │
│   └── accessibility/
│       └── a11y.spec.ts
│
└── playwright.config.ts
```

## Test Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test:headed` | Watch tests run |
| `npm run test:ui` | Interactive UI mode |
| `npm run report` | Open HTML report |

## What Each Test Category Validates

### E2E Tests
- Login/logout flows
- Modal dialogs (focus trap, keyboard navigation)
- Theme toggle persistence
- Toast notifications
- Responsive navigation (mobile/desktop)
- Data table interactions

### Form Tests
- Required field validation
- Email/password format
- Error messages
- Loading states
- Success feedback

### Accessibility Tests
- axe-core WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support (ARIA, labels)
- Focus management

## Tech Stack

- **App**: Vite, React 19, TypeScript, Tailwind CSS 4
- **Tests**: Playwright, axe-core
- **CI**: GitHub Actions (Chrome, Firefox, Mobile Safari)

## Author

**Ana Flavia Roca Rojas** - Senior QA Engineer

[LinkedIn](https://linkedin.com/in/ana-flavia-roca-rojas/)
