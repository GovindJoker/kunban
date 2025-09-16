// src/app/page.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

// Board is a client component that uses Redux, sockets and dnd.
// using dynamic import to avoid any server/client mismatch during build.
const Board = dynamic(() => import("../components/Board"), { ssr: false });

export default function HomePage() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Kanban Board</h1>
      <Board />
      <p className="text-[20px] text-gray-400 mt-1">
        Double-click to edit, press Enter to save
      </p>
    </main>
  );
}
