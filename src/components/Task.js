import React, { useState, useEffect } from "react";
import {
  Card,
  Dropdown,
  Input,
  Checkbox,
  Icon,
  Comfirm,
  Button,
  Form,
  TextArea
} from "semantic-ui-react";

import { connect } from "react-redux";
import { getTasks, deleteTask, updateTask } from "../actions/todo.actions";

function Task(props) {
  const [status, setStatus] = useState(props.status);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const options = [
    {
      key: 1,
      text: "Todo",
      value: "todo"
    },
    {
      key: 2,
      text: "En progeso",
      value: "en_progreso"
    },
    {
      key: 3,
      text: "Terminada",
      value: "terminada"
    }
  ];

  useEffect(() => {
    props.getTasks();
  });

  const handleDelete = async () => {
      await props.deleteTask(props.id);
  };

  const handleSave = async () => {
    await props.updateTask(props.id, title, description, status);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCheckbox = async (e, { checked }) => {
    await props.updateTask(props.id, title, description, checked);
  };

  let cardStyle = {
    width: "100%"
  };

  return (
    <div className={props.status === "terminada" ? "card-terminado" : "card"}>
      {editing ? (

        <Card
          color={
            props.status === "todo"
              ? "blue"
              : props.status === "en_progreso"
              ? "orange"
              : "green"
          }
          style={cardStyle}
        >
          <Card.Content>

            <Card.Header>
              {<Input value={title} onChange={e => setTitle(e.target.value)} />}
            </Card.Header>
            
            <Card.Description>{
                <Form>
                  <Form.TextArea
                    value={description}
                    rows={5}
                    width="100"
                    placeholder="Descripción"
                    onChange={e => setDescription(e.target.value)}
                  />
                </Form>}
            </Card.Description>

          </Card.Content>

          <Card.Content extra>
            <Form>
              <Form.Group widths="equal">

                <Form.Field>
                  <Form.Select
                    fluid
                    label="Estatus"
                    options={options}
                    placeholder={props.status}
                    onChange={(e, data) => setStatus(data.value)}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Button
                    type="button"
                    floated="right"
                    color="green"
                    icon="save"
                    onClick={event => handleSave()}
                  ></Form.Button>
                </Form.Field>

              </Form.Group>
            </Form>

          </Card.Content>
        </Card>
      ) : (
        <Card
          color={
            props.status === "todo"
              ? "blue"
              : props.status === "en_progreso"
              ? "orange"
              : "green"
          }
          style={cardStyle}
        >
          <Card.Content>

            <Card.Header>{title}</Card.Header>

            <Card.Meta>
              {props.status === "terminada"
                ? "Terminada: " + props.updatedAt
                : "Creada: " + props.createdAt}
            </Card.Meta>

            <Card.Description>{description}</Card.Description>

          </Card.Content>

          <Card.Content extra>
            {status}
            <Button
              type="button"
              floated="right"
              className="task-button"
              primary
              compact
              icon="edit"
              onClick={event => handleEdit()}
            ></Button>

            <Button
              type="button"
              floated="right"
              className="task-button"
              negative
              compact
              onClick={e => {
                if (
                  window.confirm(
                    "Seguro que deseas elimniar esta tarea?"
                  )
                )
                  handleDelete()
              }}
              icon="delete"
            ></Button>

          </Card.Content>
        </Card>
      )}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => dispatch(getTasks()),
    deleteTask: id => dispatch(deleteTask(id)),
    updateTask: (id, title, description, status) =>
      dispatch(updateTask(id, title, description, status))
  };
};

export default connect(null, mapDispatchToProps)(Task);
