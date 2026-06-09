function ToDoTask(props)
{
  return(
    <div className='to-do-task'>
      <div className={props.taskProgress} ></div>
      <div className='task-content'>
        <div>
          <h4>{props.taskName}</h4>
        </div>
        <div>
          <p>{props.time}</p>
        </div>
        <div>
          <input type='button' />
          <input type='button' />
        </div>
      </div>
    </div>
  );
}

export default ToDoTask;