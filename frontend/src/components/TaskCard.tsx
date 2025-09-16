"use client";

import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../redux/slices/taskSlice";
import { useAppDispatch } from "../redux/hooks";
import { deleteTask, updateTask } from "../lib/api";
import { removeTaskLocal, updateTaskLocal } from "../redux/slices/taskSlice";

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleDelete = async () => {
    dispatch(removeTaskLocal(task.id));
    try {
      await deleteTask(task.id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async () => {
    setIsEditing(false);
    dispatch(updateTaskLocal({ ...task, title }));
    try {
      await updateTask({ id: task.id, title });
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 rounded shadow bg-white flex justify-between items-center ${
            snapshot.isDragging ? "opacity-50 border-2 border-blue-500" : "opacity-100"
          }`}
        >
          {isEditing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              autoFocus
              className="flex-1 border px-2 py-1 rounded"
            />
          ) : (
            <span
              className="flex-1 cursor-pointer"
              onDoubleClick={() => setIsEditing(true)}
            >
              {task.title}
            </span>
          )}

          <button
            onClick={handleDelete}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}
    </Draggable>
  );
}
