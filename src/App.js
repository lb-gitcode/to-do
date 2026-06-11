import TaskInput from "./components/TaskInput";
import ToDoTask from "./components/ToDoTask";
import { useReducer, useEffect } from "react";

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

      array.push({ index: 1, name: action.payload, progress: 'in-progress', time: `${y}-${m}-${d} ${h}:${minsBuffer}${min}:${sBuffer}${s}` });
      console.log(tasks);
      setArray(array, 'Tasks');
      return array;
    case 'GET':
      // return getArray('Tasks');
      break;
    case 'CHANGE':
      let task = tasks.find(i => i.index === action.payload);
      if (task !== undefined)
      {
        let index = tasks.findIndex(i => i.index === action.payload);
        console.log(index);
        if (task.progress === 'in-progress')
        {
          console.log('hi');
          task.progress = 'complete';
          tasks[index] = task;
        }
        else 
        {
          console.log('heyyy');
          task.progress = 'in-progress';
          tasks[index] = task;
        }
        console.log(task);
        // set array tasks
      }
      return tasks;
    case 'DELETE':
      let deleteTask = tasks.find(i => i.index === action.payload);
      if (deleteTask !== undefined)
      {
        tasks = tasks.filter(t => t.index !== action.payload);
      }
      // set array tasks
      return tasks;
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
              onChange={() => dispatch({type: 'CHANGE', payload: link.index})}
              onDelete={() => dispatch({type: 'DELETE', payload: link.index})}
            />
          ))}
      </div>
    </>
  );
}

export default App;
