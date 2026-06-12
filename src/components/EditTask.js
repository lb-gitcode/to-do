import { useForm } from "react-hook-form";

function EditTask(props)
{
  const { register, handleSubmit, formState: {errors}, reset } = useForm();
  const formResponse = (data) => {
    reset();
    props.close();
    props.edit({ type: 'EDIT', payload: data.TaskName, index: props.task })
    return data;
  }

  return(
    <div className={props.visible}>
      <div className="edit-form">
        <form id="task-edit" onSubmit={handleSubmit(formResponse)}>
          <div className='edit-container'>
            <input 
              type='text' 
              placeholder='Edit task' 
              {...register('TaskName', {
                required: true
              })}
            />
            {errors.TaskName?.type === 'required' && <span className="error">*Task name required.</span>}
          </div>
          <input type='submit' value='Edit' />
        </form>
      </div>
    </div>
  );
}

export default EditTask;