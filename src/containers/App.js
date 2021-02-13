import Task from "../components/Task";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getTasks } from "../actions/todo.actions";

import "../App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Grid,
  Form,
  TextArea,
  Input,
  Button,
  Comfirm,
  GridColumn,
  Header
} from "semantic-ui-react";

const App = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let todoList;
  let terminadoList;
  let enProgresoList;

  useEffect(() => {
    props.getTasks();
    console.log(props.tasks);
  }, []);

  if (props.tasks != undefined) {
    console.log("Si hay data");
    todoList = props.tasks
      .filter(task => task.status === "todo")
      .map(task => <Task todo={task} />);
    enProgresoList = props.tasks
      .filter(task => task.status === "en_progreso")
      .map(task => <Task todo={task} />);
    terminadoList = props.tasks
      .filter(task => task.status === "terminada")
      .map(task => <Task todo={task} />);
  }

  // const todo = {
  //   title: "Lectura",
  //   description: "Continuar lectura",
  //   createdAt: "2021-02-11 22:26:59",
  //   updatedAt: "2021-02-11 22:30:11",
  //   status: "en_progreso"
  // };

  const handleClick = () => {
    console.log("Editando");
  };

  const headerStyle = {
    "margin-top": "10px"
  };

  return (
    <div className={"div"}>
      <div className={"div-header"}>
        <h1></h1>
        <Header
          inverted
          style={headerStyle}
          as="h2"
          icon="tasks"
          content="Todo App"
        />
        <h1></h1>
      </div>
      <Grid columns="4" widths="equal">
        <Grid.Column>
          <Form className="add-task-form">
            <Header textAlign="center" style={headerStyle}>
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

            <Form.Button color="green" fluid onClick={handleClick}>
              Guardar
            </Form.Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Header textAlign="center" style={headerStyle}>
            Todo
          </Header>
          {todoList}
        </Grid.Column>
        <Grid.Column>
          <Header textAlign="center" style={headerStyle}>
            En preceso
          </Header>
          {enProgresoList}
        </Grid.Column>
        <Grid.Column>
          <Header textAlign="center" style={headerStyle}>
            Terminado
          </Header>
          {terminadoList}
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => dispatch(getTasks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
