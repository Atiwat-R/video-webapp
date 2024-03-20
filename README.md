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
    - Google Cloud Storage (Cloud Storage)
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
- GOOGLE_SERVICE_ACCOUNT_KEY_FILE="/your-key.json"
- NEXT_PUBLIC_MOVIES_BUCKET_NAME=
- NEXT_PUBLIC_THUMBNAIL_BUCKET_NAME=


Run locally:
- Create .env file with completed environment variables
- Bring in a key.json file to link with your Google Service Account (Cloud Storage)
- npm install
- npm run dev

Cypress test:
- In one terminal: 
    - npm run dev
- In second terminal:
    - npx cypress open

NOTE: Run Cypress in Windows instead of Linux or WSL
