import StopWatch from "@/components/StopWatch";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types/Task";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const [task, setTask] = useState<Task | null>(null)

    const navigate = useNavigate()

    useEffect(() => {

        const taskIndex = parseInt(id ?? "-1", 10);

        const storedTasks = localStorage.getItem('tasks');

        if (!storedTasks || JSON.parse(storedTasks) == false) {
            setTask(null);
            return navigate('/')
        }

        let tasks = JSON.parse(storedTasks);

        let task = tasks[taskIndex];

        if (!task) {
            setTask(null);
            return navigate('/')
        }

        if (taskIndex >= 0 && taskIndex < tasks.length) {
            setTask(tasks[taskIndex]);
        } else {
            setTask(null);
        }

    }, [])


    return (
        <>
            <TaskCard 
            task={task}
            />
            <StopWatch
                taskId={id ? id : ''}
            />

        </>
    )
}
export default TaskPage;