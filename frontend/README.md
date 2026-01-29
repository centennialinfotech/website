# Centennial Infotech - React TypeScript Frontend

This is the frontend React application built with Vite and TypeScript, converted from the original static HTML website.

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Move Assets

- **CSS File**: Copy `style.css` from root to `frontend/src/style.css`
- **Images**: Move `img` folder to `frontend/public/img/`

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## Project Structure

```
frontend/
├── public/
│   └── img/          # All images should be here
├── src/
│   ├── components/   # Reusable components (Navbar, Footer, Breadcrumb)
│   ├── pages/        # Page components (Home, About, Contact, etc.)
│   ├── App.tsx       # Main app component with routing
│   ├── main.tsx      # Entry point
│   ├── style.css     # Main CSS file (copy from root)
│   └── index.css     # Global styles
├── index.html        # HTML template
├── package.json      # Dependencies
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Features

- ✅ TypeScript for type safety
- ✅ React Router for navigation
- ✅ Responsive design (Bootstrap 5)
- ✅ Interactive components (Product cards, Testimonials, Accordion)
- ✅ Contact form with reCAPTCHA
- ✅ Newsletter subscription
- ✅ All original functionality converted to React hooks

## Pages

- `/` - Home page
- `/aboutus` - About Us page
- `/contact` - Contact page
- `/services` - Services/Solutions page
- `/blogs` - Blogs page
- `/client` - Clients page

## Dependencies

- React 18.2.0
- React Router DOM 6.20.0
- Bootstrap 5.3.2
- TypeScript 5.2.2
- Vite 5.0.8

## Notes

- All components are written in TypeScript (.tsx)
- Image paths use `/img/...` format (maps to `public/img/...`)
- External scripts (Tawk.to, reCAPTCHA, etc.) are loaded in `index.html`
