import './App.css';
import { v4 as idv4 } from 'uuid'
import { useState, useEffect } from 'react';
import { getData, addData, editData, deleteData }  from './service/note';
import TodoNote from './components/TodoNote/TodoNote';
import InputForm from './components/InputForm/InputForm';

function App() {
  
  useEffect(() => {
    getData().then((data) => {setTodoStatus(data)});
  }, []);
  
  const [todoStatus, setTodoStatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filterElements = todoStatus.filter(element => {
    return element.text.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  }) 
  
  const renderTodo = filterElements.sort((a,b) => b.time - a.time).map((todo) => {
    const newKey = idv4();
    return( <TodoNote key={newKey}  
                      id={todo.id}
                      todo={todo} 
                      onCompletionToggle={toggleCompletion}
                      onRemoveClick={removeTodo} 
                      onChange={editTodoText}/> )
  });

  function addTodo(text) {
    const timeStamp = Date.now()
    const newId = idv4();
    addData({id: newId, text, complete: false, time: timeStamp})
          .then((newPost) =>  setTodoStatus([newPost, ...todoStatus]));
}

  function editTodoText(id, newText) {
    const findTodo = todoStatus.findIndex(element => element.id === id);
    todoStatus[findTodo].text = newText;
    editData(todoStatus[findTodo], id)
            .then(changedNote => setTodoStatus(
              todoStatus.map(note => note.id === id ? changedNote : note)
            ));
  }

  function removeTodo(id) {
    deleteData(id)
            .then(setTodoStatus(
              todoStatus.filter((notes) => notes.id !== id)) )
  }

  function toggleCompletion(id) {
    const findTodo = todoStatus.findIndex(element => element.id === id);
    todoStatus[findTodo].complete = !todoStatus[findTodo].complete;
    editData(todoStatus[findTodo], id)
            .then(changedCompletion => setTodoStatus(
              todoStatus.map(note => note.id === id ? changedCompletion : note)));
  }

  function RenderTodo() {
    if(filterElements.length === 0) {
      return <h2>Nothing Found!</h2>
    } else {
        return( renderTodo );
      }
  }  


  return (
    <div className="App">
      <div className='navBar'>
        <h1>To<span className='span1'>Do</span><span className='span2'>App</span></h1>
        <div className='searchWrap'>
          <input className='searchInput' placeholder='Search..' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
          <button className='searchButton' onClick={() => setSearchQuery('')}>Clear</button>
        </div>
        <InputForm addNewNote={addTodo} />
      </div>
      <div className='renderWrap'>
         <RenderTodo />
      </div>
    </div>
  );
}

export default App;
