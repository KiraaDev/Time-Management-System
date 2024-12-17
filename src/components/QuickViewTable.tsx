import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { Task } from "@/types/Task"
import { getBadge } from "@/utils/getBadge";
import { Button } from "./ui/button";
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { formatTime } from "@/utils/formatTime";

export interface TaskWithIndex extends Task {
    originalIndex: number;
}

const QuickViewTable: React.FC<{ tasks: TaskWithIndex[] }> = ({ tasks }) => {

    return (
        <>
            <Table className="w-full">
                <TableCaption>Task Quick View [High Priority]</TableCaption>
                <TableCaption>
                    <a href="/tasks" className="underline">Add new</a>
                </TableCaption>
                <TableHeader className=" bg-slate-100">
                    <TableRow className="border-[1px]">
                        <TableHead className="border-[1px] text-gray-700 w-40">Title</TableHead>
                        <TableHead className="border-[1px] text-gray-700">Body</TableHead>
                        <TableHead className="border-[1px] text-gray-700 text-center">Priority</TableHead>
                        <TableHead className="border-[1px] text-gray-700 text-center w-32">Status</TableHead>
                        <TableHead className="border-[1px] text-gray-700 w-40">
                            <span className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-1" />
                                Estimated Time
                            </span>
                        </TableHead>
                        <TableHead className="border-[1px] text-gray-700 w-40">
                            <span className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                Day | Date
                            </span>
                        </TableHead>
                        <TableHead className="border-[1px] text-gray-700 w-32">
                            <span className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-1" />
                                Time Spend
                            </span>
                        </TableHead>
                        <TableHead className="border-[1px] text-gray-700 w-20">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        tasks.length === 0 ?
                            <TableRow>
                                <TableCell className="" colSpan={5} rowSpan={2}>No High Priority Tasks</TableCell>
                            </TableRow>
                            :
                            tasks.map((task) => (
                                <TableRow key={task.originalIndex} className="h-20">
                                    <TableCell className="font-semibold border-[1px]">{task.title}</TableCell>
                                    <TableCell className="border-[1px]">{task.body}</TableCell>
                                    <TableCell className="border-[1px] w-14">{getBadge(task.priority)}</TableCell>
                                    <TableCell className="border-[1px] text-center">{task.status}</TableCell>
                                    <TableCell className="border-[1px] font-semibold text-center">{task.estimatedTime}{task.timeUnit.toLocaleLowerCase()}</TableCell>
                                    <TableCell className="border-[1px] text-center">{task.date ? new Date(task.date).toDateString() : 'No Date'}</TableCell>
                                    <TableCell className="border-[1px] font-semibold text-center">{task.timeSpent ? formatTime(task.timeSpent) : "0m 0s"}</TableCell>
                                    <TableCell className="border-[1px]">
                                        <Button variant={'default'} className="w-full">
                                            <a href={`/task/${task.originalIndex}`}>View Task</a>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>

        </>
    )
}

export default QuickViewTable;