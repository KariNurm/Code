import axios from 'axios'

const baseUrl = "http://localhost:3001/defaultTodos";

const getData = () => {
 return axios
          .get(baseUrl)
          .then((response) => response.data);
}

const addData = (newNote) => {
  return axios
          .post(baseUrl, newNote)
          .then(response =>  response.data);
}

const editData = (changeNote, id) => {
  return axios
          .put(`${baseUrl}/${id}`, changeNote)
          .then(response => response.data);
}

const deleteData = (id) => {
  return axios
          .delete(`${baseUrl}/${id}`)
          .then(response => response.data);
}


export { getData, addData, editData, deleteData};
