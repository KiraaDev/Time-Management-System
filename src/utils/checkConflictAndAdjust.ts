import { Task } from "@/types/Task";

export const resolveConflict = (task: Task, existingTasks: Task[]): Task => {
    // Create a copy of the task to avoid mutating the original
    let adjustedTask: Task = { ...task, timeStart: task.timeStart ?? 1 }; 

    while (true) {
        let conflict = false;

        for (let existingTask of existingTasks) {
            const taskDate = existingTask.date ? new Date(existingTask.date) : null;

            if (
                taskDate?.getTime() === adjustedTask.date?.getTime() &&
                existingTask.timeStart === adjustedTask.timeStart &&
                existingTask.anteMeridiem === adjustedTask.anteMeridiem
            ) {
                conflict = true;
                break;
            }
        }

        if (!conflict) {
            break; // No conflict, exit loop
        }

        // Adjust timeStart and handle AM/PM rollover
        adjustedTask.timeStart = (adjustedTask.timeStart ?? 1) + 1;
        if (adjustedTask.timeStart > 12) {
            adjustedTask.timeStart = 1;
            adjustedTask.anteMeridiem = adjustedTask.anteMeridiem === "AM" ? "PM" : "AM";
        }
    }

    return adjustedTask;
};