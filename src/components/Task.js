import { useEffect } from "react";
import { isTaskCompleted, defaultTaskValue, DOCUMENT_TITLE, PAUSE_STATUS, RESTART_STATUS, START_STATUS, formatDateToString } from "../Utility";
import { useMain } from "../MainProvider";
import { useNavigate, useParams } from "react-router-dom";


function Task() {
    const { tasks, setTasks, isDarkMode, countDown, dispatch } = useMain();
    const navigate = useNavigate();
    const params = useParams();
    
    let currentTask = tasks.find(x=> x.id === params.id); 
    currentTask = currentTask ? currentTask : defaultTaskValue;
    const duration = currentTask ? currentTask.duration : 0;
    
    const currentDate = formatDateToString(new Date());
    const fontClassName = isDarkMode ? 'charcoal-white' : 'charcoal-black';
    const backgroundClassName = isDarkMode ? 'bg-charcoal-gray' : 'bg-white';

    useEffect(() => {
        dispatch({type: "Set Initial Duration", payload: duration});
    }, [tasks])


    function formatTime(value) {
        return value < 10 ? `0${value}` : value;
    }

    useEffect(() => {
        isTaskCompleted(currentTask.duration, countDown.counter) && setTasks((tasks) => tasks.map(t => {
            if(t.id === currentTask.id) {
                return {
                    ...t,
                    isCompleted: true,
                    createdDate: currentDate
                };
            }
            return t;
        }));
    }, [countDown]);
    
    useEffect(() => {
        let timer;
        switch(countDown.status) {
            case START_STATUS:
                timer =
                    (countDown.minutes > 0 || countDown.seconds > 0) && setInterval(() => {
                        if(countDown.seconds === 0) {
                            dispatch({type: "Decrement Minute"});
                        } else {
                            dispatch({type: "Decrement Second"});
                        }
                    }
                    , 1000);
                break;
            case PAUSE_STATUS:
                clearInterval(timer);
                break;
            case RESTART_STATUS:
                clearInterval(timer);
                dispatch({type: "Reset Countdown", payload: duration});
                break;
            default:
                break;    
        }

        return () => clearInterval(timer);
    }, [countDown.minutes, countDown.seconds, countDown.status]);

    useEffect(() => {
        if(countDown.status === START_STATUS && !isTaskCompleted(currentTask.duration, countDown.counter)) {
            document.title = `${formatTime(countDown.minutes)} : ${formatTime(countDown.seconds)} - ${currentTask.title}`;
            return;
        }

        document.title = DOCUMENT_TITLE;
    }, [countDown])


    return(
        <div className="main-content">
            <div className={`sub-content ${fontClassName} ${backgroundClassName}`}>
            <button className={`btn btn-md font-bold ${fontClassName} bg-info ml-auto`} onClick={() => navigate("/")}>Back To List</button>
                <div className="task-item-group">
                    <div className="task-item-content">
                        <div className={`task-item-clock ${fontClassName}`}>
                            {formatTime(countDown.minutes)} : {formatTime(countDown.seconds)}
                        </div>  
                        <div className="task-divider"></div>
                        <div className="task-item-action-group">
                            <div>
                                <button className={`btn ${fontClassName} bg-success`} onClick={() => dispatch({type: "Status Change", payload: START_STATUS})}>Start</button>
                                <button className={`btn ${fontClassName} bg-error`} onClick={() => dispatch({type: "Status Change", payload: PAUSE_STATUS})}>Pause</button>
                            </div>
                            <div>
                                <button className={`btn ${fontClassName} bg-warning`} onClick={() => dispatch({type: "Status Change", payload: RESTART_STATUS})}>Restart</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`task-item-content ${fontClassName}`}>
                        <div className="task-item-content-header">
                            <div className={fontClassName}>{currentTask.title}</div>
                        </div>
                        <div className="task-divider"></div>
                        <div className={`task-item-content-detail ${fontClassName}`}>
                            {currentTask.description}
                        </div>
                        <div className="task-divider"></div>
                        <div className={`task-item-content-date ${fontClassName}`}>
                            Task added on: {currentTask.createdDate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;