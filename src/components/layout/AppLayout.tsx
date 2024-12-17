import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

function AppLayout() {

    return (
        <>

            <NavBar />
            <div className="flex-grow flex flex-col items-center h-[80svh]">
                <div className="containe flex flex-col items-start w-[70%] mt-10">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default AppLayout
