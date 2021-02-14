import axios from "axios";

export const getTasks = () => {
  return dispatch => {
    axios
      .get("http://localhost:3010/tasks")
      .then(res => {
        dispatch({
          type: "get_tasks",
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const updateTask = (id, title, description, status) => {
  return dispatch => {
    axios
      .patch("http://localhost:3010/tasks/update", { id, title, description, status })
      .then(res => {
        dispatch({
          type: "post_task",
          payload: res.data
        });
      });
  };
};

export const postTask = (title, description) => {
  return dispatch => {
    axios
      .post("http://localhost:3010/tasks/add", { title, description })
      .then(res => {
        dispatch({
          type: "update_task",
          payload: res.data
        });
      });
  };
};

export const deleteTask = id => {
  return dispatch => {
    axios.delete(`http://localhost:3010/tasks/delete/${id}`).then(res => {
      dispatch({
        type: "delete_task",
        payload: res.data
      });
    })
    .catch(err=>{
      console.log(err)
    })
  };
};
