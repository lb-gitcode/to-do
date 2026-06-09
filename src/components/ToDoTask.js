function ToDoTask(props)
{
  return(
    <div className='to-do-task'>
      <div className='task-progress'></div>
      <div>
        <h4>{props.taskName}</h4>
      </div>
      <div>
        <p>{props.time}</p>
      </div>
    </div>
  );
}

export default ToDoTask;