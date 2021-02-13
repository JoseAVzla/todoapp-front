import axios from "axios";

export const getTasks = () => {
    return (dispatch) => {
        axios.get("http://localhost:3010/tasks")
        .then(res => {
            dispatch({
                type: "get_tasks",
                payload: res.data
            })
        })
        .catch(error => {
            console.error(error);
        })
    }
}

export const postTask = (title, description) => {
    return (dispatch) => {
        axios.post("http://localhost:3001/tasks/add", {title, description})
        .then(res => {
            dispatch({
                type: "post_data",
                payload: res.data
            })
        })
    }
}

export const deleteTask = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/tasks/delete/${id}`,)
        .then(res => {
            dispatch({
                type: "delete_data",
                payload: res.data
            })
        })
    }
}

export const updateTask = (id, newTitle, newDescription, newStatus) => {
    return (dispatch) => {
        axios.patch(`http://localhost:3001/tasks/update/${id}`, { newTitle, newDescription, newStatus})
        .then(res => {
            dispatch({
                type: "update_data",
                payload: res.data
            })
        })
    }
}