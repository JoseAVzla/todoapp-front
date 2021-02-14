import { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getTasks,
  postTask,
  updateTask,
  deleteTask
} from "../actions/todo.actions";
import Task from "../components/Task";

import "semantic-ui-css/semantic.min.css";
import { Grid, Form, Header, Icon } from "semantic-ui-react";
import "../App.css";

const App = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let todoList;
  let terminadoList;
  let enProgresoList;

  useEffect(() => {
    props.getTasks();
  });

  if (props.tasks != undefined) {
    todoList = props.tasks
      .filter(task => task.status === "todo")
      .map(task => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          updatedAt={task.updated_at}
          createdAt={task.created_at}
        />
      ));
    enProgresoList = props.tasks
      .filter(task => task.status === "en_progreso")
      .map(task => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          updatedAt={task.updated_at}
          createdAt={task.created_at}
        />
      ));
    terminadoList = props.tasks
      .filter(task => task.status === "terminada")
      .map(task => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          updatedAt={task.updated_at}
          createdAt={task.created_at}
        />
      ));
  }

  const handleSubmitTask = async () => {
    await props.postTask(title, description);
    setTitle("");
    setDescription("");
  };

  const headerStyle = {
    marginTop: "10px"
  };

  return (
    <div className={"div"}>
      <div className={"div-header"}>
        <Header as="h2" icon="tasks" content="Todo App" />
      </div>

      <Grid columns="4" widths="equal">
        
        <Grid.Column>
          <Form className="add-task-form">
            <Header textAlign="center" style={headerStyle}>
              {<Icon name='add' />}
              Agregar tarea!
            </Header>

            <Form.Group widths="equal">
              <Form.Input
                fluid
                value={title}
                placeholder="Título"
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.TextArea
                value={description}
                rows={2}
                placeholder="Descripción"
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Button color="green" fluid onClick={handleSubmitTask}>
              Guardar
            </Form.Button>
          </Form>
        </Grid.Column>

        <Grid.Column>
          <Header textAlign="center" style={headerStyle}>
            {<Icon name='tasks' />}
            Todo.
          </Header>
          {todoList}
        </Grid.Column>

        <Grid.Column>
          <Header textAlign="center" style={headerStyle}>
            {<Icon name='redo' />}
            En progreso.
          </Header>
          {enProgresoList}
        </Grid.Column>

        <Grid.Column>
          <Header textAlign="center" style={headerStyle}>
            {<Icon name='check' />}
            Terminado.
          </Header>
          {terminadoList}
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    updatedTask: state.updatedTask,
    deletedTask: state.deletedTask
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => dispatch(getTasks()),
    postTask: (title, description) => dispatch(postTask(title, description))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
