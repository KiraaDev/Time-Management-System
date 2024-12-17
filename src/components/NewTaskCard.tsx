import React, { useEffect, useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Task } from "@/types/Task";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { resolveConflict } from "@/utils/checkConflictAndAdjust";

interface NewTaskCardProps {
    closeModal: () => void;
    addNewTask: (task: Task) => void,
    addNewTaskWithConflict: (task: Task) => void,
}

const NewTaskCard: React.FC<NewTaskCardProps> = ({ closeModal, addNewTask, addNewTaskWithConflict }) => {

    const dateNow: Date = new Date()

    dateNow.setDate(dateNow.getDate() - 1);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
    const [estimatedTime, setEstimatedTime] = useState('');
    const [timeUnit, setTimeUnit] = useState<"M" | "H">("M");

    const [date, setDate] = useState<Date | undefined>(undefined)

    const [hour, setHour] = useState<string>('')
    const [anteMeridiem, setAnteMeridiem] = useState<"AM" | "PM">('AM')

    const [errorMsg, setErrorMsg] = useState<string>('')

    const getStoredTasks = () => {
        const storedTasks = localStorage.getItem('tasks');

        return storedTasks ? JSON.parse(storedTasks) : [];
    };

    const storedTasks = getStoredTasks();

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        if (title == "" || body == "" || estimatedTime == "" || date == undefined || hour == "") {
            return setErrorMsg('All fields are required')
        }

        const selectedDate = new Date(date);
        const selectedHour = parseInt(hour);
        const selectedAMPM = anteMeridiem;
        if (selectedAMPM === "PM" && selectedHour < 12) {
            selectedDate.setHours(selectedHour + 12);  // Convert PM times to 24-hour format
        } else if (selectedAMPM === "AM" && selectedHour === 12) {
            selectedDate.setHours(0);  // Convert 12 AM to midnight
        } else {
            selectedDate.setHours(selectedHour);
        }

        // Check if the selected date/time is in the past
        const currentDate = new Date();
        if (selectedDate < currentDate) {
            setErrorMsg("The selected time cannot be in the past.");
            return;
        }

        const timeStart = parseInt(hour)

        // create new task by passing all states 
        const newTask = {
            title,
            body,
            priority,
            status: 'not-started',
            estimatedTime,
            timeSpent: 0,
            timeUnit,
            date,
            timeStart,
            anteMeridiem
        };

        const resolvedTask = resolveConflict(newTask, storedTasks);

        // Check if resolveConflict made changes
        const conflictResolved =
            resolvedTask.timeStart !== newTask.timeStart || resolvedTask.anteMeridiem !== newTask.anteMeridiem;
    
        if (conflictResolved) {
            addNewTaskWithConflict(resolvedTask);
        } else {
            // No conflict, add the task as is
            addNewTask(newTask);
        }
    
        // Close the modal
        closeModal();

    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-scroll">
            <Card className="w-[40rem] absolute z-20 ">
                <CardHeader className="flex justify-between flex-row">
                    <div>
                        <CardTitle className="text-2xl">Create New Task</CardTitle>
                        <CardDescription>Fill in the details for your new task</CardDescription>
                        {
                            errorMsg != "" ? <p className="text-red-700">{errorMsg}</p> : ''
                        }
                    </div>
                    <div>
                        <Button onClick={closeModal} variant={"destructive"}>X</Button>
                    </div>
                </CardHeader>
                <form>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title*</Label>
                            <Input
                                id="title"
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="body">Body*</Label>
                            <Textarea
                                id="body"
                                placeholder="Enter task description"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority*</Label>
                            <Select

                                value={priority}
                                onValueChange={(value) => setPriority(value as "low" | "medium" | "high")}
                                required>
                                <SelectTrigger id="priority">
                                    <SelectValue placeholder="Select priority*" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 ">
                            <Label htmlFor="estimatedTime">Date*</Label>
                            <div className="flex gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={'outline'}>
                                            {!date ? "Pick a date" : date.toLocaleDateString()}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={(date) =>
                                                date < dateNow
                                            }
                                            required
                                        />
                                    </PopoverContent>
                                </Popover>
                                <div className="w-20">
                                    <Select
                                        value={hour}
                                        onValueChange={(val) => setHour(val)}
                                        required
                                    >
                                        <SelectTrigger>
                                            {hour == "" ? 'Hour' : hour}
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="12">12</SelectItem>
                                            <SelectItem value="11">11</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="9">9</SelectItem>
                                            <SelectItem value="8">8</SelectItem>
                                            <SelectItem value="7">7</SelectItem>
                                            <SelectItem value="6">6</SelectItem>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="1">1</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Select
                                        value={anteMeridiem}
                                        onValueChange={(value) => setAnteMeridiem(value as "AM" | "PM")}
                                        required
                                    >
                                        <SelectTrigger>
                                            {anteMeridiem == "AM" || "PM" ? 'Ante Meridiem' : anteMeridiem}
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AM">AM</SelectItem>
                                            <SelectItem value="PM">PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estimatedTime">Estimated Time*</Label>
                            <Select
                                value={timeUnit}
                                onValueChange={(value) => setTimeUnit(value as "M" | "H")}
                            >
                                <SelectTrigger id="time">
                                    <SelectValue placeholder="Select Time " />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">Minute(s)</SelectItem>
                                    <SelectItem value="H">Hour(s)</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                className="w-full"
                                id="estimatedTime"
                                type="number"
                                placeholder="Enter estimated time"
                                value={estimatedTime}
                                onChange={(e) => setEstimatedTime(e.target.value)}
                                min="1"
                                step="1"
                                required
                            />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSubmit} type="submit" className="w-full">Create Task</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default NewTaskCard;