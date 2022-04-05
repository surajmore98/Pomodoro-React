import React, { useContext, useState, useEffect } from 'react';
import { useTaskReducer } from './ListReducer';

const MainContext = React.createContext();

const useMain = () => useContext(MainContext);

function MainProvider({ children }) {
    const [isFormVisible, setFormVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState("");
    const [isDarkMode, setDarkMode] = useState(false);
    const taskList = JSON.parse(localStorage.getItem("Tasks"));
    const [countDown, dispatch] = useTaskReducer();

    useEffect(() => {    
        taskList && setTasks(taskList);
    }, []);

    useEffect(() => {
        tasks && localStorage.setItem("Tasks",JSON.stringify(tasks));
    }, [tasks]);

    return(
        <MainContext.Provider value={{isFormVisible, tasks, currentTaskId, isEdit, isDarkMode, countDown,
         setFormVisible, setTasks, setCurrentTaskId, setEdit, setDarkMode, dispatch}}>
                {children}
        </MainContext.Provider>
    );
}

export { MainProvider, useMain };
