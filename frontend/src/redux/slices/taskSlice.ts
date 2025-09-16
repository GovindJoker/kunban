// src/redux/slices/taskSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  order: number;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTaskLocal: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTaskLocal: (state, action: PayloadAction<Task>) => {
      const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.tasks[idx] = { ...state.tasks[idx], ...action.payload };
    },
    removeTaskLocal: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTasks, addTaskLocal, updateTaskLocal, removeTaskLocal } =
  taskSlice.actions;

export default taskSlice.reducer;
