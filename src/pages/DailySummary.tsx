import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Task } from "@/types/Task";
import { isSameDay } from "@/utils/sameDay";
import { formatTime } from "@/utils/formatTime";

const DailySummary: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [totalEstimated, setTotalEstimated] = useState<string>("00:00:00");
    const [totalActual, setTotalActual] = useState<string>("00:00:00");

    useEffect(() => {
        const today = new Date();


        const todayTasks = tasks.filter((task) => isSameDay(task.date, today));

        let estimatedTotal = 0;
        let actualTotal = 0;

        todayTasks.forEach((task) => {

            const estimatedMinutes = convertToMinutes(task.estimatedTime, task.timeUnit);
            if (!isNaN(estimatedMinutes)) {
                estimatedTotal += estimatedMinutes;
            } else {
                console.error(`Invalid estimated time for task: ${task.title}`);
            }

            // Convert time spent from ms to minutes
            const actualMinutes = task.timeSpent / (1000 * 60);
            if (!isNaN(actualMinutes)) {
                actualTotal += actualMinutes;
            } else {
                console.error(`Invalid time spent for task: ${task.title}`);
            }
        });

        const formattedEstimated = formatTimeHHMMSS(estimatedTotal);
        const formattedActual = formatTimeHHMMSS(actualTotal);

        setTotalEstimated(formattedEstimated);
        setTotalActual(formattedActual);

    }, [tasks]);


    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const parsedTasks = JSON.parse(storedTasks);
            setTasks(parsedTasks);
        }
    }, []);

    const convertToMinutes = (time: string, unit: 'M' | 'H'): number => {
        const timeValue = parseFloat(time);
        if (isNaN(timeValue)) {
            console.error(`Invalid time value: "${time}" with unit "${unit}"`);
            return 0;
        }

        switch (unit) {
            case 'M': // Minutes
                return timeValue;
            case 'H': // Hours
                return timeValue * 60;
            default:
                console.error(`Unknown time unit: "${unit}"`);
                return 0;
        }
    };

    const formatTimeHHMMSS = (totalMinutes: number): string => {
        const totalSeconds = Math.floor(totalMinutes * 60);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const currentDate = new Date();

    const formattedDate = currentDate.toDateString();

    function convertTimeToMilliseconds(time: number, unit: 'M' | 'H'): number {
        const msInMinute = 60000;
        const msInHour = 3600000;

        if (unit === 'M') {
            return time * msInMinute;
        } else if (unit === 'H') {

            return time * msInHour;
        }
        return 0; 
    }

    return (
        <>
            <div className="flex justify-center items-center w-full mb-10">
                <h1 className=" font-bold text-2xl">{formattedDate}</h1>
            </div>
            <div className=" flex gap-4 w-full justify-center items-center">

                <Card className=" w-96 flex justify-center items-center flex-col">
                    <CardHeader>
                        <CardTitle>Total Estimated Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{totalEstimated}</p>
                    </CardContent>
                </Card>
                <Card className=" w-96 flex justify-center items-center flex-col">
                    <CardHeader>
                        <CardTitle>Total Actual Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{totalActual}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-center items-center w-full mt-10 flex-col">
                {

                    tasks.filter((task: Task) => {
                        const taskDate = task.date ? new Date(task.date) : new Date();

                        // Remove time part from current date
                        currentDate.setHours(0, 0, 0, 0);

                        return taskDate.getTime() === currentDate.getTime();
                    }).map((task: Task, index: number) => (
                        <div key={index} className="space-y-2 w-[50%]">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{task.title}</span>
                                <span className="text-sm text-muted-foreground font-semibold">
                                    {formatTime(task.timeSpent)} / {task.estimatedTime}{task.timeUnit.toLowerCase()}
                                </span>
                            </div>
                            <progress className="h-4 w-full rounded-lg" color="#fff" value={task.timeSpent} max={convertTimeToMilliseconds(parseInt(task.estimatedTime), task.timeUnit)}></progress>
                        </div>
                    )).length  === 0 && 'No task for today'
                }
            </div>
        </>
    )
}

export default DailySummary;