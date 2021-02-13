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
    case "post_tasks":
      return Object.assign({}, state, {
        postedTasks: action.payload
      });
    case "update_tasks":
      return Object.assign({}, state, {
        updatedTasks: action.payload
      });
    case "delete_tasks":
      return Object.assign({}, state, {
        deletedTasks: action.payload
      });
    default:
      return state;
  }
};

export default TodoReducer;
