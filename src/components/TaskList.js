import { useMain } from "../MainProvider";
import { currentDate } from "../utility";
import AddTask from "./AddTask";
import TaskListItem from "./TaskListItem";

function TaskList() {
    const { isFormVisible, setFormVisible, tasks, currentTaskId } = useMain();
    const todayTasks = tasks && tasks.length ? tasks.filter(t => t.createdDate === currentDate) : tasks;
    const header = todayTasks && todayTasks.length > 0 ? `You have ${todayTasks.length} tasks for today, All the best!!` : `No Task, Let's start from today`;

    function addClickHandler() {
        setFormVisible(true);
    }

return(
        <div className="main-content">
            <div className="header">
                <h1>Welcome!</h1>
                <h3>{header}</h3>
            </div>
            <div className="sub-content bg-white charcoal-black">
                <div className="sub-content-header">
                    <h2>To - Do List</h2>
                    <button className="btn btn-md bg-primary white" onClick={addClickHandler}>
                        Add
                    </button>
                </div>
                <div className="sub-content-list">
                    {
                        todayTasks && todayTasks.map((task, index) => {
                            return <TaskListItem task={task} key={index}/>
                        })
                    }               
                </div>
            </div>
            { isFormVisible && <AddTask  id={currentTaskId} /> }
        </div>
        
    )
}

export default TaskList;