import { Task } from "@/types/Task";

export const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}