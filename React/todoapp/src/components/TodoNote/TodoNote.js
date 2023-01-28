import { useState } from 'react';
import './TodoNote.css';

function TodoNote ({id, todo, onCompletionToggle, onRemoveClick, onChange}) {
	const bgCol = todo.complete === true ? " bg-col-green" : " bg-col-red";
	const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(todo.text)
  const saveHandler = () => {
    if(inputValue === '') {

    } else {
      setEditMode(false); 
      onChange(id, inputValue)
    }
  }

  return (
		<div className={"todo-note"+bgCol}>
        <input className='checkBox' type="checkbox" checked={todo.complete} onChange={() => onCompletionToggle(id)} />
        <p className='labelCheck'>Done</p>
        { editMode === false
            ? <>
                <p className='noteText'>{todo.text}</p>
                <button className='editButton' onClick={() => setEditMode(true)}>Edit</button>
                <button className="removeButton" onClick={() => onRemoveClick(id)}>X</button>
              </>
            : <>
                <input className='saveInput' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
                {inputValue === '' ? <div className='wrapEmpty'><p className='inputEmpty'>Note must have content!</p></div> : <></>}
                <button className='saveButton' onClick={() => {saveHandler()}}>Save</button>
                <button className="removeButtonEdit" onClick={() => onRemoveClick(id)}>X</button>
              </>
        }
    </div>
  )
};

export default TodoNote;