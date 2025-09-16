"use client";

import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import {  Task } from "../redux/slices/taskSlice"
import { addTask } from "../lib/api";

interface ColumnProps {
  title: string;
  droppableId: string;
  tasks: Task[];
}

export default function Column({ title, droppableId, tasks }: ColumnProps) {
  const [newTask, setNewTask] = useState("");

 const handleAddTask = async () => {
  if (!newTask.trim()) return;

  try {
    await addTask({
      title: newTask,
      status: droppableId as Task["status"],
      order: tasks.length,
    });
    setNewTask(""); // clear input
    // No dispatch here, socket will handle update
  } catch (err) {
    console.error("Add task failed:", err);
  }
};


  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-2">{title}</h2>

      {/* Add Task Input */}
      <div className="flex mb-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder={`Add task in ${title}`}
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          +
        </button>
      </div>

      {/* Droppable area */}
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-2 min-h-[100px] p-2 rounded ${
              snapshot.isDraggingOver ? "bg-blue-50" : "bg-gray-50"
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
