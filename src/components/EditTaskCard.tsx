import React, { useEffect, useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Task, TaskWithOriginalIndex } from "@/types/Task";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

interface EditTaskCardProps {
    task: TaskWithOriginalIndex | null;
    closeEditModal: () => void;
    editTask: (updatedTask: Task, originalIndex: number) => void;
}

const EditTaskCard: React.FC<EditTaskCardProps> = ({ task, closeEditModal, editTask }) => {

    const dateNow: Date = new Date()
    
    const [title, setTitle] = useState(task?.title || "");
    const [body, setBody] = useState(task?.body || "");
    const [priority, setPriority] = useState(task?.priority || "low");
    const [status, setStatus] = useState(task?.status || "");
    const [estimatedTime, setEstimatedTime] = useState(task?.estimatedTime || "");
    const [timeUnit, setTimeUnit] = useState(task?.timeUnit || "H");
    const [date, setDate] = useState(task?.date ? new Date(task?.date) : null);
    const [hour, setHour] = useState(task?.timeStart ? task?.timeStart.toString() : "");
    const [anteMeridiem, setAnteMeridiem] = useState(task?.anteMeridiem || "AM");

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && body) {
            const updatedTask: Task = {
                ...task,
                title,
                body,
                priority,
                status: status || "",
                estimatedTime: estimatedTime || "",
                timeUnit: timeUnit || "H",
                date: date ? new Date(date) : undefined,
                timeStart: hour ? parseInt(hour) : undefined,
                anteMeridiem,
            };
            editTask(updatedTask, task?.originalIndex || 0);
        }
    };
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-scroll">
                <Card className="w-[40rem] absolute z-20 ">
                    <CardHeader className="flex justify-between flex-row">
                        <div>
                            <CardTitle className="text-2xl">Edit your task</CardTitle>
                            <CardDescription>Fill in the details for your updated task</CardDescription>
                        </div>
                        <div>
                            <Button onClick={closeEditModal} variant={"destructive"}>X</Button>
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
                                                selected={date ? date : new Date}
                                                onSelect={(val) => setDate(val)}
                                                disabled={(date) =>
                                                    date < dateNow
                                                }
                                                required
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <div className="w-20">
                                        <Select
                                            value={hour ? hour : ''}
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
                                            value={anteMeridiem ? anteMeridiem : ''}
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
                            <Button onClick={handleSave} type="submit" className="w-full">Create Task</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default EditTaskCard;