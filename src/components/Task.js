import { usecountDown, useEffect, useReducer } from "react";
import isTaskCompleted, { currentDate, defaultTaskValue, DOCUMENT_TITLE, PAUSE_STATUS, RESTART_STATUS, START_STATUS } from "../utility";
import { useMain } from "../MainProvider";
import { useNavigate, useParams } from "react-router-dom";

function useTaskReducer() {
    const initialCountDown = {
        minutes: 0,
        seconds: 0,
        status: "",
        counter: 0
    }
    return useReducer(function redduceFunction(countDown, action){
        switch (action.type) {
            case "Set Initial Duration":
                return {...countDown, minutes: action.payload};
            case "Decrement Minute":
                return {...countDown, minutes: countDown.minutes - 1, seconds: 59, counter: countDown.counter + 1};
            case "Decrement Second":
                return {...countDown, seconds: countDown.seconds - 1, counter: countDown.counter + 1};
            case "Reset Countdown":
                return { ...countDown, minutes: action.payload, seconds: 0};
            case "Status Change":
                return { ...countDown, status: action.payload};
            default:
                break;
        }
    }, initialCountDown);
    
}

function Task() {
    const { tasks ,setTasks } = useMain();
    const navigate = useNavigate();
    const params = useParams();
    const [countDown, dispatch] = useTaskReducer();

    let currentTask = tasks.find(x=> x.id === params.id); 
    currentTask = currentTask ? currentTask : defaultTaskValue;
    const duration = currentTask ? currentTask.duration : 0;

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
        console.log(countDown.status);
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
            <div className="sub-content bg-white charcoal-black">
            <button className="btn white bg-info ml-auto" onClick={() => navigate("/")}>Back To List</button>
                <div className="task-item-group">
                    <div className="task-item-content">
                        <div className="task-item-clock">
                            {formatTime(countDown.minutes)} : {formatTime(countDown.seconds)}
                        </div>  
                        <div className="task-divider"></div>
                        <div className="task-item-action-group">
                            <div>
                                <button className="btn white bg-success" onClick={() => dispatch({type: "Status Change", payload: START_STATUS})}>Start</button>
                                <button className="btn white bg-error" onClick={() => dispatch({type: "Status Change", payload: PAUSE_STATUS})}>Pause</button>
                            </div>
                            <div>
                                <button className="btn white bg-warning" onClick={() => dispatch({type: "Status Change", payload: RESTART_STATUS})}>Restart</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="task-item-content">
                        <div className="task-item-content-header">
                            <div>{currentTask.title}</div>
                        </div>
                        <div className="task-divider"></div>
                        <div className="task-item-content-detail">
                            {currentTask.description}
                        </div>
                        <div className="task-divider"></div>
                        <div className="task-item-content-date charcoal-gray">
                            Task added on: {currentTask.createdDate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;