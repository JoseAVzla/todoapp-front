import { useState, useEffect } from "react";
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

const Task = ({ todo }) => {
  const [estatus, setEstatus] = useState(todo.status);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  let sideBarStyle = {
    width: "100%"
  };

  const options = [
    {
      key: 1,
      text: "En progeso",
      value: "en_progreso"
    },
    {
      key: 2,
      text: "Terminada",
      value: 'terminada'
    }
  ];

  const handleClick = () => {
    setEditing(!editing);
  };

  return (
    <div className={ todo.status === 'terminada' ?  "card-terminado" : "card"}>
      {editing ? (
        <Card color="blue" style={sideBarStyle}>
          <Card.Content>
            <Card.Header>
              {<Input value={title} onChange={e => setTitle(e.target.value)} />}
            </Card.Header>
            <Card.Meta>{todo.createdAt + " - " + todo.updatedAt}</Card.Meta>
            <Card.Description>
              {
                <Form>
                  <TextArea
                    value={description}
                    rows={5}
                    width="100"
                    placeholder="Descripción"
                    onChange={e => setDescription(e.target.value)}
                  />
                </Form>
              }
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
                    placeholder="Estatus"
                  />
                </Form.Field>
                <Form.Field>
                  <Button
                    floated="right"
                    color="green"
                    icon="edit"
                    onClick={event => handleClick()}
                  ></Button>
                </Form.Field>
              </Form.Group>
            </Form>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      ) : (
        <Card color="orange" style={sideBarStyle}>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>{ todo.status === 'Terminado' ? todo.createdAt + " - " + todo.updatedAt : todo.createdAt}</Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            {estatus}
            <Button
              floated="right"
              className="task-button"
              primary
              compact
              size="mini"
              icon="edit"
              onClick={event => handleClick()}
            ></Button>
            <Button
              floated="right"
              className="task-button"
              negative
              compact
              size="mini"
              onClick={event => handleClick()}
              icon="delete"
            ></Button>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default Task;
