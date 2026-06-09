import TaskInput from "./components/TaskInput";
import ToDoTask from "./components/ToDoTask";

function App() {
  return (
    <>
      <header>
        <h2>To-Do</h2>
      </header>
      <TaskInput />
      <div className='task-container'>
        <ToDoTask taskName={"bruh"} time={Date.now().toLocaleString()} taskProgress='in-progress' />
        <ToDoTask taskProgress='complete' />
        <ToDoTask />
        <ToDoTask />
        <ToDoTask />
      </div>
    </>
  );
}

export default App;
