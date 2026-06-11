import TaskInput from "./components/TaskInput";
import ToDoTask from "./components/ToDoTask";
import { useReducer, useEffect, act } from "react";

function reducer(tasks, action)
{
  switch (action.type)
  {
    case 'ADD':
      let array = [...tasks];

      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDay();
      let h = date.getHours();
      let min = date.getMinutes();
      let minsBuffer = '';
      let s = date.getSeconds();
      let sBuffer = '';
      if (min < 10) 
      {
        minsBuffer += '0';
      }
      if (s < 10)
      {
        sBuffer += '0';
      }

      array.push({ index: 0, name: action.payload, progress: 'in-progress', time: `${y}-${m}-${d} ${h}:${minsBuffer}${min}:${sBuffer}${s}` });
      console.log(tasks);
      setArray(array, 'Tasks');
      return array;
    case 'GET':
      // return getArray('Tasks');
    default:
      return tasks;
  }
}

function setArray(arr, arrName)
{
  localStorage.setItem(`${arrName}`, JSON.stringify(arr));
}

function getArray(arrName)
{
  return JSON.parse(localStorage.getItem(`${arrName}`));
}

function dispatchIndex(taskIndex, action) 
{
  switch (action.type)
  {
    case 'ADD':
      return taskIndex + 1;
    case 'GET':
      return taskIndex;
    default:
      return taskIndex;
  }
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, []);  
  const [taskIndex, addIndex] = useReducer(dispatchIndex, 1);

  const addTask = () => {
    dispatch({type: 'ADD' });
  }

  useEffect(() => {
    dispatch({type: 'GET'});
  }, []);

  return (
    <>
      <header>
        <h2>To-Do</h2>
      </header>
      <TaskInput addIndex={addIndex} taskIndex={taskIndex} dispatch={dispatch} tasks={tasks} />
      <div className='task-container'>
          {tasks.map(link => (
            <ToDoTask 
              key={link.index}
              taskName={link.name} 
              time={link.time} 
              taskProgress={link.progress} 
            />
          ))}
      </div>
    </>
  );
}

export default App;
