import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface DeleteModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-scroll">
                <Card className="w-96 absolute z-20 flex gap-20 flex-col p-10 text-center max-w-sm mx-auto rounded-lg shadow-lg">
                    <CardTitle className=" text-xl"> Are you sure you want to delete this task?</CardTitle>
                    <CardDescription className="flex justify-between space-x-4">
                        <Button variant="outline" onClick={onCancel}>Cancel</Button>
                        <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
                    </CardDescription>
                </Card>
            </div>
        </>
    )
}

export default DeleteModal;