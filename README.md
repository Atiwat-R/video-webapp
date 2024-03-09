# Video Webapp

A Web Application for watching movies and videos. Furnished with authentication system, React frontend UI, MongoDB database, and more.

Vercel deployed site:
- https://video-webapp-5emfb3zok-atiwat-rs-projects.vercel.app/


Use:
- Frontend
    - React
    - TypeScript
    - NEXT.js
    - Tailwind CSS
- Backend
    - NEXT.js API
    - NextAuth (Authentication)
    - Redis (Server-side Caching)
- Database
    - MongoDB
    - Prisma (ORM for Database)
- Deployment
    - Vercel
- Testing
    - Jest (Unit Testing)
    - React Testing Library (Unit Testing)
    - Cypress (End-to-End Testing)


Environment Variables (.env):
- DATABASE_URL=
- NEXTAUTH_JWT_SECRET=
- NEXTAUTH_SECRET=
- GITHUB_ID=
- GITHUB_SECRET=
- GOOGLE_CLIENT_ID=
- GOOGLE_CLIENT_SECRET=
- REDIS_URL="rediss://default:< PASSWORD >@< ENDPOINT >:< PORT >"


Run locally:
- Create .env file with completed environment variables
- npm install
- npm run dev

