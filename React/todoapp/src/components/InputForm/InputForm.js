import {useState} from 'react';
import './InputForm.css'

function InputForm ({addNewNote}) {

  const [newTodo, setNewTodo] = useState('');
  const [warningStatus, setWarningStatus] = useState(false)
  
  const submitHandler = (event) => {
    event.preventDefault();
    
    newTodo !== ''
            ? addNewNote(newTodo)
            : setWarningStatus(true)

    setNewTodo('')
  
  }

  return (<form className='form' onSubmit={submitHandler}>
        { warningStatus === true
          ? <div className='warning'>
              <p className='emptyNote'>No empty notes!</p>
              <button className='okBtn' onClick={e => setWarningStatus(false)}>Ok</button>
            </div>
          : <>
              <input className='inputField' type='text' 
                     placeholder='Add a new note'
                     value={newTodo}
                     onChange={(e) => setNewTodo(e.target.value)} />
             <button className='inputButton' type='submit'>Add</button>
            </>
        }
          </form >)

}

export default InputForm;