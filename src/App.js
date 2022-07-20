import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Task from './components/Task';
import TaskList from './components/TaskList';
import { useMain } from './MainProvider';

function App() {
  const { isDarkMode } = useMain();
  const backgroundClassName = isDarkMode ? 'bg-charcoal-gray' : 'bg-charcoal-white';

  return (
    <div className={`App ${backgroundClassName}`}>
      <Navbar/>
      <Routes>
        <Route path="/" element= {<TaskList/>}/> 
        <Route path="/task/:id" element = {<Task/>} />
      </Routes>
    </div>
  );
}

export default App;
