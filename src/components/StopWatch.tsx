import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from 'lucide-react';
import { Task } from '@/types/Task';
import { saveTasks } from '@/utils/saveTaskToLocalStorage';
import { formatTime } from '@/utils/formatTime';

interface StopWatchProps {
    taskId: string;
}

const StopWatch: React.FC<StopWatchProps> = ({ taskId }) => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState(false);
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const tasks: Task[] = JSON.parse(storedTasks);
            const currentTask = tasks[parseInt(taskId)];
            setTask(currentTask);
            if (currentTask?.timeSpent) {
                setTime(currentTask.timeSpent);
            }
        }
    }, [taskId]);

    useEffect(() => {
        if (task) {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                const tasks: Task[] = JSON.parse(storedTasks);
                const estimatedTimeInMs =
                    parseInt(task.estimatedTime) * (task.timeUnit === "H" ? 3600000 : 60000);

                tasks[parseInt(taskId)] = {
                    ...task,
                    timeSpent: time,
                    status: time >= estimatedTimeInMs ? "completed" : task.status,
                };

                saveTasks(tasks);
            }
        }
    }, [time, task, taskId]);

    // Start or pause the stopwatch
    const handleStartPause = (): void => {
        if (!isRunning) {
            setIsRunning(true);
            if (task) {
                const storedTasks = localStorage.getItem('tasks');
                const tasks: Task[] = JSON.parse(storedTasks ? storedTasks : '');
                tasks[parseInt(taskId)] = { ...task, status: "In Progress" };
                saveTasks(tasks);
            }
        } else {
            setIsRunning(false);
            window.location.reload()
        }
    };

    // Update the time every 10 milliseconds while the stopwatch is running
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            if (timer) clearInterval(timer);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning]);

    const formatTime = (time: number): string => {
        const milliseconds = ("0" + ((time / 10) % 100)).slice(-2);
        const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
        const minutes = ("0" + Math.floor(time / 60000)).slice(-2);
        const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="text-6xl font-bold mb-6" aria-live="polite">
                    {formatTime(time)}
                </div>
                <Button
                    onClick={handleStartPause}
                    className="w-32 h-32 rounded-full"
                    aria-label={isRunning ? 'Pause' : 'Play'}
                >
                    {isRunning ? (
                        <Pause className="h-16 w-16" />
                    ) : (
                        <Play className="h-16 w-16" />
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};

export default StopWatch;
