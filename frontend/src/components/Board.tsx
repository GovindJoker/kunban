"use client";

import React, { useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setTasks,
  updateTaskLocal,
  addTaskLocal,
  removeTaskLocal,
} from "../redux/slices/taskSlice";
import {
  getTasks,
  updateStatus,
} from "../lib/api";
import { initSocket } from "../lib/socket";
import { toast } from "react-toastify";

export default function Board() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  // Load tasks from backend
  useEffect(() => {
    getTasks()
      .then((res) => {
        const serverTasks = res.data.map((t: any) => ({
          id: t._id ?? t.id,
          title: t.title,
          status: t.status,
          order: t.order,
        }));
        dispatch(setTasks(serverTasks));
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [dispatch]);

  // Socket events
  useEffect(() => {
    const socket = initSocket();
    socket.on("taskAdded", (t: any) => {
      dispatch(addTaskLocal({ ...t, id: t._id ?? t.id }));
    });
    socket.on("taskUpdated", (t: any) => {
      dispatch(updateTaskLocal({ ...t, id: t._id ?? t.id }));
    });
    socket.on("taskDeleted", (id: string) => {
      dispatch(removeTaskLocal(id));
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, [dispatch]);

  // Handle drag drop
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) return;

    // Optimistic UI update
    dispatch(
      updateTaskLocal({
        id: draggableId,
        title: tasks.find((t) => t.id === draggableId)?.title || "",
        status: destination.droppableId as "todo" | "in-progress" | "done",
        order: 0,
      })
    );

    try {
      await updateStatus(draggableId, destination.droppableId);
      toast.success("Task status updated!");
    } catch (err) {
        toast.success("Task status updated!");
      console.error("Update failed:", err);
    }
  };

  // Group tasks
  const grouped = {
    todo: tasks.filter((t) => t.status === "todo"),
    inprogress: tasks.filter((t) => t.status === "in-progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Column title="Todo" droppableId="todo" tasks={grouped.todo} />
        <Column
          title="In Progress"
          droppableId="in-progress"
          tasks={grouped.inprogress}
        />
        <Column title="Done" droppableId="done" tasks={grouped.done} />
      </DragDropContext>
      
    </div>
  );
}
