import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Task from './components/Task';
import TaskList from './components/TaskList';
import { useMain } from './MainProvider';

function App() {
  return (
    <div className="App white bg-primary">
      <Navbar/>
      <Routes>
        <Route path="/" element= {<TaskList/>}/> 
        <Route path="/task/:id" element = {<Task/>} />
      </Routes>
    </div>
  );
}

export default App;
