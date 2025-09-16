# Kanban Board Project

A real-time Kanban Board built with Next.js, Redux, Node.js, Express, Socket.io, and MongoDB Atlas.

# Features

Drag & drop tasks between Todo, In Progress, and Done.

Add, edit (double-click + Enter), and delete tasks.

Real-time updates across all clients using Socket.io.

Optimistic UI for smooth user experience.

Tech Stack

Frontend: Next.js, Redux Toolkit, Tailwind CSS, @hello-pangea/dnd

Backend: Node.js, Express, MongoDB Atlas, Socket.io

Setup
# Backend
cd backend 
npm install
# create .env with MONGO_URI
npm run dev

# Frontend
cd frontend 
npm install
# create .env.local with
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

npm run dev


Open http://localhost:3000 in your browser.
