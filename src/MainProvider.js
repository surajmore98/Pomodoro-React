import React, { useContext, useState, useEffect } from 'react';

const MainContext = React.createContext();

const useMain = () => useContext(MainContext);

function MainProvider({ children }) {
    const [isFormVisible, setFormVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState("");

    const taskList = JSON.parse(localStorage.getItem("Tasks"));

    useEffect(() => {    
        taskList && setTasks(taskList);
    }, []);

    useEffect(() => {
        tasks && localStorage.setItem("Tasks",JSON.stringify(tasks));
    }, [tasks]);

    return(
        <MainContext.Provider value={{isFormVisible, tasks, currentTaskId, isEdit, setFormVisible, setTasks, setCurrentTaskId, setEdit}}>
                {children}
        </MainContext.Provider>
    );
}

export { MainProvider, useMain };
