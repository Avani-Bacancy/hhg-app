import React, { FunctionComponent, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import { post } from "../Network";

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  position: string;
}
const defaultValue: IEmployee = {
  id: "",
  name: "",
  email: "",
  position: "",
};

const AddEmploye: FunctionComponent<{
  isOpen: boolean;
  toggle: () => void;
  onAddEmployee: (data: IEmployee) => void;
  setIsLoading: () => void;
}> = ({ isOpen, toggle, onAddEmployee, setIsLoading }) => {
  const [employee, setEmployee] = useState(defaultValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const onSubmit = (data: IEmployee) => {
    const { name, email, position } = data;
    if (name && email && position) {
      setIsLoading();
      post("employees", data).then((response) => {
        setEmployee(defaultValue);
        toggle();
        onAddEmployee(response.data);
      });
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Employee</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='name'>
              Name
              <span className='text-danger'> * </span>
            </Label>
            <Input
              type='text'
              name='name'
              placeholder='Name'
              required
              value={employee.name}
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for='email'>
              Email
              <span className='text-danger'> * </span>
            </Label>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              required
              value={employee.email}
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for='position'>
              Position
              <span className='text-danger'> * </span>
            </Label>
            <Input
              type='text'
              name='position'
              placeholder='Position'
              required
              value={employee.position}
              onChange={onChange}
            />
          </FormGroup>

          <Button
            color='primary'
            type={"submit"}
            onClick={(e) => {
              e.preventDefault();
              onSubmit(employee);
            }}
            className='mr-2'
          >
            Submit
          </Button>
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddEmploye;
