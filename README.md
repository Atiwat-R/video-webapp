# Video Webapp

A Web Application for watching movies and videos. Furnished with authentication system, React frontend UI, MongoDB database, and more.

### Vercel deployed site
- https://video-webapp-5i6nh2ibo-atiwat-rs-projects.vercel.app

### Tools Used
- Frontend
    - React
    - TypeScript
    - NEXT.js
    - Tailwind CSS
- Backend
    - Node.js
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


### Environment Variables (.env)
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

NOTE: A .env.example file is also available

### Run locally
- Create .env file with completed environment variables
- Bring in a key.json file to link with your Google Service Account (Cloud Storage)
- npm install
- npm run dev

### Cypress test
- In one terminal: 
    - npm run dev
- In second terminal:
    - npx cypress open

NOTE: Run Cypress in Windows instead of Linux or WSL


# Design Documentations

### Idea

The main idea for this web application is to be a lite video streaming platform modeled after Netflix, with a few additional features added in.

The basic tools chosen at the start is essentially React, NEXT.js, and Tailwind. These are relatively modern frameworks, with NEXT.js + TypeScript also allowing for backend API routes implementation, with NEXT.js being built atop Node.js. And Tailwind CSS for decoration and UI design as it provides a simpler implementation than regular CSS.

### Database

I've used both Relational Database and Cloud Storage to store relevant data. As a video streaming platform, displaying movies for users is a primary goal. For this, I'm using MongoDB and Google CLoud Storage.

MongoDB, as a relational database, is used to store traditional data, such as user accounts, details of each movies, etc. As movie files and thumbnail pictures would be too large to storage in a relational database, I stored them in Google Cloud Storage instead, and associated their links in MongoDB.

### Cloud Storage & File Uploads

As I've decided to also allow users to upload movies, implementing a way to handle file upload is also a task I've spend a lot of thought on. A normal HTTP POST request would not do well with a large file like movies, which could contain over many hundreds of Megabytes of data.

Instead, I've implemented resumable uploads and chunking techniques to allow for file upload. Essentially, breaking a large files into multiple chunks and uploading them to the backend one-by-one, before reassembling them at the destination. I've decided to use open-source library tus-js for this task, which greatly optimizes the process, as it supports transferring data over from backend to Google Cloud Service as well.

### Caching & Web Loading Performance

I implemented Redis for server-side caching. Essentially store data I've requested recently before instead of having the backend code retrieve it from the database again, which would've taken more time and thus, longer page reloads.

With local setup, it's possible to host redis on the local environment, only needing to dictate the necessary environment files. But since this is a personal project, I've decided to keep it simple and implemented Redis with serverless database service from Upstash in my own deployment. They offered a free tier with limited cache hits that resets daily, which is more than enough for this project and provides a simpler time setting up.

### Testing

I did both Unit testing and End-to-End testing, using Jest and Cypress respectively. Jest to mostly test individual components in the frontend, while using Cypress to make sure all functionalities of the web page works as intended.


