import { Badge } from "../components/ui/badge"

export const getBadge = (priority: String) => {
    if (priority === 'high') {
        return (
            <Badge className=" flex justify-center items-center bg-red-100 text-red-800 hover:bg-red-200" variant='destructive'>
                {priority}
            </Badge>
        )
    } else if(priority === 'medium') {
        return (
            <Badge className=" flex justify-center items-center bg-yellow-100 text-yellow-800 hover:bg-yellow-200"  variant='secondary'>
                {priority}
            </Badge>
        )
    } else {
        return (
            <Badge className=" flex justify-center items-center bg-green-100 text-green-800 hover:bg-green-200" >
                {priority}
            </Badge>
        )
    }
}