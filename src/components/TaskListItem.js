import { useNavigate } from "react-router-dom";
import { useMain } from "../MainProvider";

function TaskListItem({task}) {
    const { id, title, isCompleted } = task;
    const { setTasks, setCurrentTaskId, setFormVisible, setEdit } = useMain();
    const navigate = useNavigate();
    const taskClass = isCompleted ? 'sub-content-list-item completed' : 'sub-content-list-item dark';

    function deleteHandler() {
        setTasks((tasks) => tasks.filter(task => task.id !== id));
    }

    function editClickHandler() {
        if(!isCompleted) {
            setFormVisible(true);
            setEdit(true);
            setCurrentTaskId(id);
        }
    }

    function navigateToTask() {
        if(!isCompleted) {
            navigate(`/task/${id}`);
        }
    }

    return(
        <div className={taskClass}>
            <div className="title" onClick={navigateToTask}>{title}</div>
            <div className="btn-grp">
                <button className="btn btn-round primary bg-white" onClick={editClickHandler}>
                    <i className="material-icons">mode_edit</i>
                </button>
                <button className="btn btn-round primary bg-white" onClick={deleteHandler}>
                    <i className="material-icons">delete</i>
                </button>
            </div>
        </div>
    );
}

export default TaskListItem;