# Sacred Heart Secondary School - Multi-Page React Application

This is a modern multi-page React application built for Sacred Heart Secondary School using Vite, React, TypeScript, and Tailwind CSS.

## Project Structure

```
src/
├── components/           # Reusable UI components (HeroSection)
├── layouts/              # MainLayout (wraps pages with Nav/Footer)
├── pages/                # Distinct components for each route
│   ├── HomePage.tsx      # Home page with hero section
│   ├── AcademicsPage.tsx # Academics information
│   ├── AdmissionsPage.tsx # Admissions requirements
│   ├── ApplyPage.tsx     # Application form
│   ├── FeesPage.tsx      # Boarding fees table
│   ├── ActivitiesPage.tsx # Activities gallery
│   ├── EventsPage.tsx    # Events calendar/list
│   ├── KitchenPage.tsx   # School kitchen menu
│   ├── StaffPage.tsx     # Teachers profile grid
│   └── ContactPage.tsx   # Contact form and info
├── data/                 # Data files for mock content
│   ├── staff.ts          # Teachers data
│   ├── fees.ts           # Fees structure
│   ├── events.ts         # Events data
│   └── activities.ts     # Activities data
├── App.tsx               # Router configuration
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Pages Included

- **Home** (`/`): Hero section, principal's welcome, highlights
- **Academics** (`/academics`): Curriculum information and matric results
- **Admissions** (`/admissions`): Entry requirements and prospectus download
- **Apply** (`/apply`): Student application form with file upload
- **Boarding Fees** (`/fees`): Fee structure table for 2024/2025
- **Activities** (`/activities`): Image grid for school activities
- **Events** (`/events`): Upcoming events list
- **Kitchen** (`/kitchen`): Daily menu cards
- **Staff** (`/staff`): Teacher profile grid
- **Contact** (`/contact`): Contact information and inquiry form

## Features

- Multi-page architecture using React Router
- Responsive design (Mobile, Tablet, Desktop)
- Modern UI with school's color palette (#4747d7 primary, #26262c secondary)
- Interactive components including forms, tables, and cards
- Custom icons from Lucide React
- Mock data stored in separate data files
- Navigation highlighting current active page
- Collapsible mobile hamburger menu

## Color Palette

- Primary: #4747d7 (Royal Blue)
- Secondary/Dark: #26262c (Dark Charcoal)
- Text: #76767f (Muted Grey)
- Background: #ffffff (White) and #f6f7fd (Very Light Blue)
- Accent: #bfd1ff (Light Blue)

## Running the Application

1. Make sure you have Node.js installed on your machine
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open your browser to http://localhost:5173

## Building for Production

To create a production build:
```bash
npm run build
```

## Technologies Used

- React 18 with TypeScript
- Vite as build tool
- React Router DOM for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Responsive design with mobile-first approach