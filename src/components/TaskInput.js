import { useReducer } from "react";
import { useForm } from 'react-hook-form';

function TaskInput(props)
{
  const { register, getValues, handleSubmit, formState: {errors}, reset } = useForm();
  const formResponse = (data) => {
    reset();
    props.dispatch({ type: 'ADD', payload: data.TaskName})
    props.addIndex({ type: 'ADD' });
    return data;
  }

  return(
    <div className='task-input'>
      <form id="task-input" onSubmit={handleSubmit(formResponse)}>
        <input 
          type='text' 
          placeholder='Enter a task' 
          {...register('TaskName', {
            required: true
          })}
        />
        {errors.TaskName?.type === 'required' && <span className="error">*Task name required.</span>}
        <input type='submit' value='Add' />
      </form>
    </div>
  );
}

export default TaskInput;