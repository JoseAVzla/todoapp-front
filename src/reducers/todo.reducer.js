const TodoReducer = (state, action) => {
  const initialState = {
    tasks: [{ title: "", description: "" }]
  };

  if (typeof state == "undefined") return initialState;

  switch (action.type) {
    case "get_tasks":
      return Object.assign({}, state, {
        tasks: action.payload
      });
    case "post_task":
      return Object.assign({}, state, {
        postedTask: action.payload
      });
    case "update_task":
      return Object.assign({}, state, {
        updatedTask: action.payload
      });
    case "delete_task":
      return Object.assign({}, state, {
        deletedTask: action.payload
      });
    default:
      return state;
  }
};

export default TodoReducer;
