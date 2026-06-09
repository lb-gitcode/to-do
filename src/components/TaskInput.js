function TaskInput()
{
  return(
    <div className='task-input'>
      <form>
        <input type='text' placeholder='Enter a task' />
        <input type='submit' value='Add' />
      </form>
    </div>
  );
}

export default TaskInput;