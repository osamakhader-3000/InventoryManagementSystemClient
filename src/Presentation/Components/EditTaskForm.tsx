import { useContext, useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { DependencyContext } from "../../context/DependencyContext";
import styles from "./EditTaskForm.module.css";

export default function EditTaskForm() {

    const { taskService } = useContext(DependencyContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskId, setTaskId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        async function fetchTaskData() {

            let taskId = window.location.pathname.split("/").pop();
            if (!taskId) return;

            let result = await taskService.GetTask(taskId);
            if (result) {
                setTitle(result.title);
                setDescription(result.description);
                setTaskId(taskId);
            }

            setIsLoading(false);
        }

        fetchTaskData();
    }, []);

    if (isLoading)
        return (
            <div className={styles.messagecontainer}>
                <h3>Please wait</h3>
                <h3>Loading your task ...</h3>
            </div>
        );


    return (
        <TaskForm editMode={true} taskId={taskId} taskTitle={title} taskDescription={description} />
    );
}
