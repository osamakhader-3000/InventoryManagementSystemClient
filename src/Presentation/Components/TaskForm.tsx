import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../context/DependencyContext';
import Task from '../../Domain/Entities/Task';
import styles from './TaskForm.module.css'
import { TextBox } from './GeneralComponents/TextBox';
import { MultiLineTextBox } from './GeneralComponents/MultiLineTextBox';
import { LoadingButton } from './GeneralComponents/LoadingButton';


interface TaskFormProps {
  taskId?: string | null;
  taskTitle?: string | null;
  taskDescription?: string | null;
  editMode?: boolean;
}


export default function TaskForm({ taskId = null, taskTitle = null, taskDescription = null, editMode: editMode = false }: TaskFormProps) {

  const { taskService, notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();



  const [title, setTitle] = useState(taskTitle ?? "");
  const [description, setDescription] = useState(taskDescription ?? "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTitle(taskTitle ?? "");
    setDescription(taskDescription ?? "");
  }, [taskTitle, taskDescription]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextAreaInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const addTask = async () => {

    if (title.trim() === "") {
      errorHandlingBus.ErrorOccured("Title cannot be empty");
      return;
    }


    let _task = new Task(taskId, title, description);
    setIsSaving(true);
    let result = await taskService.CreateTask(_task);
    if (result) {
      notificationHandlingBus.NotificationOccured("Task added successfully");
      navigate('/mytasks');
    }
    setIsSaving(false);

  };


  const updateTask = async () => {

    if (title.trim() === "") {
      errorHandlingBus.ErrorOccured("Title cannot be empty");
      return;
    }

    let _task = new Task(taskId, title, description);

    setIsSaving(true);

    let result = await taskService.UpdateTask(_task);
    if (result){
      notificationHandlingBus.NotificationOccured("Task updated successfully");
      navigate('/mytasks');
    }

    setIsSaving(false);
  }

  const handleCancel = () => {
    navigate('/mytasks');

  }



  return (
    <div className={styles.maincontainer}>
      <div className={styles.taskformcontainer}>
        <h2>
          {editMode ? "Edit Task" : "Add Task"}
        </h2>
        <div className={styles.taskformelementcontainer}>

          <TextBox onChange={handleInputChange} value={title} placeholder="Title"></TextBox>

        </div>
        <div className={styles.taskformelementcontainer}>
          <MultiLineTextBox rows={20} onChange={handleTextAreaInputChange} value={description} placeholder="Description"></MultiLineTextBox>
        </div>

        <div className={`${styles.taskformelementcontainer} ${styles.taskformelementbuttoncontainer}`}>

          {!editMode && <LoadingButton cssClass={`${styles.taskformbutton} ${styles.taskformokbutton}`} onClick={addTask} label='Add' isLoading={isSaving} />}
          {editMode && <LoadingButton cssClass={`${styles.taskformbutton} ${styles.taskformokbutton}`} onClick={updateTask} label='Save' isLoading={isSaving} />}

          <button className={styles.taskformbutton} onClick={handleCancel}>Cancel</button>
        </div>



      </div>


    </div>
  )

}