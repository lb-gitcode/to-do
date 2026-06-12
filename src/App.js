import EditTask from "./components/EditTask";
import TaskInput from "./components/TaskInput";
import ToDoTask from "./components/ToDoTask";
import { useReducer, useEffect } from "react";

function reducer(tasks, action)
{
  switch (action.type)
  {
    case 'ADD':
      if (tasks !== null && tasks !== undefined)
      {
        let array = [...tasks];

        array.push({ index: action.index, name: action.payload, progress: 'in-progress', time: getCurrentTime() });
        setArray(array, 'Tasks');
        return array;
      }
      else
      {
        let initArray = [{ index: action.index, name: action.payload, progress: 'in-progress', time: getCurrentTime() }];
        setArray(initArray, 'Tasks');
        return initArray;
      }
    case 'GET':
      return getArray('Tasks');
    case 'CHANGE':
      let task = tasks.find(i => i.index === action.payload);
      let newArr = [...tasks];
      if (task !== undefined)
      {
        let index = newArr.findIndex(i => i.index === action.payload);
        
        if (action.prog === 'in-progress')
        {
          console.log('Task complete.');
          task.progress = 'complete';
          newArr[index] = task;
        }
        else if (action.prog === 'complete')
        {
          console.log('Task in progress.');
          task.progress = 'in-progress';
          task.time = getCurrentTime();
          newArr[index] = task;
        }
        else 
        {
          console.log('Something is wrong with the task.');
        }
        setArray(newArr, 'Tasks');
      }
      return newArr;
    case 'EDIT':
      let editTask = tasks.find(i => i.index === action.index);
      let editArr = [...tasks];
      if (editTask !== undefined && editTask !== null)
      {
        let editTaskIndex = editArr.findIndex(i => i.index === action.index);
        editTask.name = action.payload;
        editArr[editTaskIndex] = editTask;
      }
      else 
      {
        console.log('There is an issue with this task.');
      }
      return editArr;
    case 'DELETE':
      let deleteTask = tasks.find(i => i.index === action.payload);
      if (deleteTask !== undefined)
      {
        tasks = tasks.filter(t => t.index !== action.payload);
        console.log('Deleted a task.');
      }
      setArray(tasks, 'Tasks');
      return tasks;
    default:
      return tasks;
  }
}

function getCurrentTime()
{
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
  return `${y}-${m}-${d} ${h}:${minsBuffer}${min}:${sBuffer}${s}`;
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
      if (taskIndex === null || taskIndex === undefined)
      {
        return 0;
      }
      else 
      {
        return taskIndex + 1;
      }
    case 'GET':
      let arr = getArray('Tasks');
      if (arr !== null && arr!== undefined && arr.length > 0)
      {
        return Math.max(...arr.map(i => i.index)) + 1;
      }
      else
      {
        return 0;
      }
    default:
      return taskIndex;
  }
}

function dispatchTask(task, action)
{
  return action.payload;
}

function dispatchModal(modal, action)
{
  return !modal;
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, []);  
  const [taskIndex, addIndex] = useReducer(dispatchIndex, 0);
  const [modal, openModal] = useReducer(dispatchModal, false);
  const [task, changeTask] = useReducer(dispatchTask, null);

  useEffect(() => {
    dispatch({type: 'GET'});
    addIndex({type: 'GET'});
  }, []);

  return (
    <>
      <header>
        <h2>To-Do</h2>
      </header>
      <EditTask visible={modal ? '' : 'hide-modal'} task={task} edit={dispatch} close={openModal} />
      <TaskInput addIndex={addIndex} taskIndex={taskIndex} dispatch={dispatch} tasks={tasks} />
      <div className='task-container'>
          {tasks?.map(link => (
            <ToDoTask 
              key={link.index}
              taskName={link.name} 
              time={link.time} 
              taskProgress={link.progress} 
              onChange={() => dispatch({type: 'CHANGE', payload: link.index, prog: link.progress})}
              onEdit={() => {
                changeTask({payload: link.index});
                openModal();
              }}
              onDelete={() => dispatch({type: 'DELETE', payload: link.index})}
            />
          ))}
      </div>
    </>
  );
}

export default App;
