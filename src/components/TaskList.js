import { useState } from "react";
import { useMain } from "../MainProvider";
import { COMPLETED_TASK_FILTER, CURRENT_MONTH_FILTER, CURRENT_WEEK_FILTER, formatDateToString, PENDING_TASK_FILTER, TODAY_FILTER, getFilterTasks } from "../Utility";
import AddTask from "./AddTask";
import TaskListItem from "./TaskListItem";

function TaskList() {
    const [filter, setFilter] = useState("");
    const { isFormVisible, setFormVisible, tasks, currentTaskId, isDarkMode } = useMain();
    const filteredTasks = getFilterTasks(tasks, filter);;
    const header = filteredTasks && filteredTasks.length > 0 ? `You have created ${filteredTasks.length} tasks , All the best!!` : `No Task, Let's start from today`;

    function addClickHandler() {
        setFormVisible(true);
    }

    function filterClickHandler(type) {
        setFilter(type);
    }

    function isActive(type) {
        return type === filter ? "active" : "";
    }
    
    const fontClassName = isDarkMode ? 'charcoal-white' : 'charcoal-black';
    const backgroundClassName = isDarkMode ? 'bg-charcoal-gray' : 'bg-white';

    return(
        <div className="main-content">
            <div className={`header ${fontClassName}`}>
                <h1>Welcome!</h1>
                <h3>{header}</h3>
            </div>
            <div className="filter">
                <button 
                    className={`btn btn-outline ${fontClassName} ${backgroundClassName} ${isActive(TODAY_FILTER)}`} 
                    onClick={() => filterClickHandler(TODAY_FILTER)}>
                        Today
                </button>
                <button 
                    className={`btn btn-outline ${fontClassName} ${backgroundClassName} ${isActive(CURRENT_WEEK_FILTER)}`} 
                    onClick={() => filterClickHandler(CURRENT_WEEK_FILTER)}>
                        Week
                </button>
                <button 
                    className={`btn btn-outline ${fontClassName} ${backgroundClassName} ${isActive(CURRENT_MONTH_FILTER)}`} 
                    onClick={() => filterClickHandler(CURRENT_MONTH_FILTER)}>
                        Month
                </button>
                <button 
                    className={`btn btn-outline ${fontClassName} ${backgroundClassName} ${isActive(COMPLETED_TASK_FILTER)}`} 
                    onClick={() => filterClickHandler(COMPLETED_TASK_FILTER)}>
                        Completed
                </button>
                <button 
                    className={`btn btn-outline ${fontClassName} ${backgroundClassName} ${isActive(PENDING_TASK_FILTER)}`} 
                    onClick={() => filterClickHandler(PENDING_TASK_FILTER)}>
                        Pending
                </button>
            </div>
            <div className={`sub-content ${fontClassName} ${backgroundClassName}`}>
                <div className="sub-content-header">
                    <h2>To - Do List</h2>
                    <button className={`btn btn-md bg-primary font-bold ${fontClassName}`} onClick={addClickHandler}>
                        Add
                    </button>
                </div>
                <div className="sub-content-list">
                    {
                        filteredTasks && filteredTasks.map((task, index) => {
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