import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getBadge } from "@/utils/getBadge";
import { Task } from "@/types/Task";
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { formatTime } from "@/utils/formatTime";

const TaskCard: React.FC<{ task: Task | null }> = ({ task }) => {

    const getFormattedTimeSpent = () => {
        if (task?.timeSpent && !isNaN(task.timeSpent) && task.timeSpent >= 0) {
            return formatTime(task.timeSpent);
        }
        return '0h 0m 0s'; 
    };
    
    return (
        <>
            <Card className="w-full mb-3">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center text-3xl">
                        <span>{task?.title}</span>
                            { task?.priority ? getBadge(task?.priority) : ''}
    
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500 mb-4">{task?.body}</p>
                    <div className="flex justify-between items-center mb-2">
                        <Badge variant="secondary" className="p-3">{task?.status}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            <span>
                                Estimated: <span className="font-bold">{task?.estimatedTime}{task?.timeUnit.toLowerCase()}</span>
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        Time spent:  <span className="font-bold">{getFormattedTimeSpent()}</span>
                    </div>
                </CardContent>
                {task?.date && (
                    <CardFooter>
                        <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            <span>{task.date ? new Date(task.date).toDateString() : 'No Date'} | {task?.timeStart}{task.anteMeridiem}</span>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </>
    )
}

export default TaskCard;