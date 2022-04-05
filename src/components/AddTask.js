import { useState } from "react";
import { formatDateToString, defaultTaskValue } from "../Utility";
import { useMain } from "../MainProvider";
import { v4 as uuidv4 } from 'uuid';

function AddTask({ id }) {
    const { setCurrentTaskId, setTasks, isEdit, setEdit, setFormVisible, tasks }  = useMain();

    let currentTask = id && tasks.find(x => x.id === id);
    currentTask = currentTask ? currentTask : defaultTaskValue;
    const currentDate = formatDateToString(new Date());

    const [task, setTask] = useState(currentTask);

    function formSubmit(e)  {
        e.preventDefault();
        closeClickHandler();
        if(isEdit) {
            setTasks((tasks) => tasks.map(t => {
                if(t.id === task.id) {
                    return {
                        ...t,
                        title: task.title,
                        description: task.description,
                        duration: task.duration,
                        createdDate: currentDate
                    };
                }
                return t;
            }));
            return;
        }

        setTasks([...tasks].concat({...task, createdDate : currentDate, id: uuidv4()}));
    }

    function closeClickHandler()  {
        setFormVisible(false);
        setEdit(false);
        setCurrentTaskId(undefined);
    }

    function inputChangedHandler(e , prop) {
        const value = e.target.value;
        setTask((task) => {
            return {...task, [prop]: value}
        });
    }

    return(
        <div className="form-container">
            <form className="form" onSubmit={formSubmit}>
                <div className="form-field-group">
                    <input className="form-field-item bg-charcoal-white" type="text" placeholder="Add Title" onChange={(e) => inputChangedHandler(e, "title")} value={task.title}/>
                    <textarea  className="form-field-item bg-charcoal-white" placeholder="Add Description" onChange={(e) => inputChangedHandler(e, "description")} value={task.description}></textarea>
                    <input className="form-field-item bg-charcoal-white" placeholder="Add Time (in minutes)" type="number" onChange={(e) => inputChangedHandler(e, "duration")} value={task.duration}/>
                </div>

                <div className="form-btn-group">
                    <button className="btn bg-charcoal-white primary" onClick={closeClickHandler}>Cancel</button>
                    <button className="btn bg-primary white" type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddTask;