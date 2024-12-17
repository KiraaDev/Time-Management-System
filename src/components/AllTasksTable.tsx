import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { Task, TaskWithOriginalIndex } from "@/types/Task"
import { getBadge } from "@/utils/getBadge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button";
import DeleteModal from "./DeleteModal";
import { formatTime } from "@/utils/formatTime";
import { CalendarIcon, ClockIcon } from 'lucide-react'

interface AllTasksTableProps {
    tasks: (Task & { originalIndex: number })[]; 
    deleteTask: (index: number) => void;
    editTask: (task: TaskWithOriginalIndex) => void;
}

const AllTaskTable: React.FC<AllTasksTableProps> = ({ tasks, deleteTask, editTask }) => {

    const [index, setIndex] = useState<number | null>(null)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    const handleDeleteClick = (index: number) => {
        setIndex(index);
        setDeleteModal(true);
    };

    const confirmDelete = () => {
        if (index !== null) {
            deleteTask(index)
        }
        setDeleteModal(false);
        setIndex(null);
    }

    const cancelDelete = () => {
        setDeleteModal(false);
        setIndex(null);
    };

    return (
        <>
            <Table className="w-full">
                <TableCaption>All Tasks</TableCaption>
                <TableHeader className=" bg-slate-100">
                    <TableRow className="border-[1px]">
                        <TableHead className="border-[1px] text-gray-700 w-40">Title</TableHead>
                        <TableHead className="border-[1px] text-gray-700 w-96">Body</TableHead>
                        <TableHead className="border-[1px] text-gray-700  text-center">Priority</TableHead>
                        <TableHead className="border-[1px] text-gray-700 text-center">Status</TableHead>
                        <TableHead className="border-[1px] text-gray-700">
                            <span className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-1" />
                                Estimated Time
                            </span>
                        </TableHead>
                        <TableHead className="border-[1px] text-gray-700">
                            <span className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                Day | Date
                            </span>
                        </TableHead>
                        <TableHead className="border-[1px] text-gray-700">
                            <span className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-1" />
                                Time Spend
                            </span>
                        </TableHead>
                        <TableHead className="border-[1px] text-gray-700">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        deleteModal ? <DeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} /> : ''
                    }
                    {tasks.length === 0 ?

                        <TableRow>
                            <TableCell className="" colSpan={5}>No Tasks Found</TableCell>
                        </TableRow>
                        : tasks.map((task) => (

                            <TableRow key={task.originalIndex} className="h-20">
                                <TableCell className="font-semibold border-[1px]">{task.title}</TableCell>
                                <TableCell className="border-[1px]">{task.body}</TableCell>
                                <TableCell className="border-[1px] w-14">{getBadge(task.priority)}</TableCell>
                                <TableCell className="border-[1px] text-center">{task.status}</TableCell>
                                <TableCell className="border-[1px] font-semibold text-center">{task.estimatedTime}{task.timeUnit.toLocaleLowerCase()}</TableCell>
                                <TableCell className="border-[1px] font-semibold text-center">{task.date && new Date(task.date).toDateString()} | {task.timeStart}{task.anteMeridiem}</TableCell>
                                <TableCell className="border-[1px] font-semibold text-center">{task.timeSpent ? formatTime(task.timeSpent) : "0h 0m 0s"}</TableCell>
                                <TableCell className="border-[1px]">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className=' text-center w-full font-extrabold text-2xl'>⋮</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Button variant={'default'} className="w-full">
                                                    <a href={`task/${task.originalIndex}`}>View Task</a>
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Button 
                                                onClick={() => editTask(task)}
                                                className=" w-full bg-yellow-500 hover:bg-yellow-700">EDIT</Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Button
                                                    onClick={() => handleDeleteClick(task.originalIndex)}
                                                    variant={'destructive'} className=" w-full">DELETE</Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    )
}

export default AllTaskTable;