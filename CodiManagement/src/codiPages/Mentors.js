//import Page from 'components/Page';
import './codiStyles/CodiDashboard.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  CardText,
  CardImg,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
  UncontrolledAlert
} from 'reactstrap';
import { IconWidget } from 'components/Widget';
import {  MdRoom } from 'react-icons/md';

import codilogo from 'assets/img/logo/Codi-Logo.png';

const BranchesInfo = (props) => {
  const [admins, setAdmins] = useState([]);
  const [branchInputs, setBranchInputs] = useState([]);

  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState();
  const [errors, setErrors] = useState(false);

  const catchInput = e => {
    e.persist();
    setBranchInputs({
      ...branchInputs,
      [e.target.name]: e.target.value,
    });
    console.log(branchInputs);
  };

  const getMentors = async () => {
    const res = await fetch('http://localhost:8000/api/all-admins');
    const result = await res.json();
    setAdmins(result.data);
    console.log(result.data)
    
  };

  

  const createBranch = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/branch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...branchInputs,
        
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      window.location.reload();
    } else {
      setErrors(result.errors);
    }
  };
  const editBranch = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/branch/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...branchInputs,
        
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      window.location.reload();
    } else {
      setErrors(result.errors);
    }
  };

  const deleteBranch = async id => {
    const deleteRequestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(
      `http://localhost:8000/api/branch/${id}`,
      deleteRequestOptions,
    );
    const result = await res.json();

    console.log(result.message);
    setModal(!modal);
    getMentors();

  };

  useEffect(() => {
    getMentors();
    
  }, []);

  return (
    <Row>
      <Col>
        
        <Card className="mb-3">
          <CardHeader>
            Mentors
            <Button
                className="ml-3"
                color="primary"
                onClick={() => setCreateForm(!createForm)}
              >
                Create New Mentor
              </Button>
          </CardHeader>
          <CardBody>
          
                <Row hidden={!createForm}>
                  <Col sm={6}>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Branch Name
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder=""
                          onChange={catchInput}
                          name="branch_name"
                        />
                        {errors.branch_name ? (
                          <UncontrolledAlert color="danger">{errors.branch_name} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Branch Country
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          onChange={catchInput}
                          name="branch_country"
                        />
                        {errors.branch_country ? (
                          <UncontrolledAlert color="danger">{errors.branch_country} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Branch Location
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          onChange={catchInput}
                          name="branch_location"
                        />
                        {errors.branch_location ? (
                          <UncontrolledAlert color="danger">{errors.branch_location} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                        <Button color="primary" onClick={createBranch}>
                          Submit
                        </Button>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

                <Row hidden={!editForm}>
                  <Col sm={6}>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Branch Name
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder=""
                          onChange={catchInput}
                          name="branch_name"
                        />
                        {errors.branch_name ? (
                          <UncontrolledAlert color="danger">{errors.branch_name} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Branch Country
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          onChange={catchInput}
                          name="branch_country"
                        />
                        {errors.branch_country ? (
                          <UncontrolledAlert color="danger">{errors.branch_country} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Branch Location
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          onChange={catchInput}
                          name="branch_location"
                        />
                        {errors.branch_location ? (
                          <UncontrolledAlert color="danger">{errors.branch_location} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                        <Button color="primary" onClick={editBranch}>
                          Submit
                        </Button>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>


              
            <Row>
                <Col>
                    <Card body>
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Description</th>
                           
                            <th>Active</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {admins.map((admin, key) =>
                           
                              <tr key={key}>
                                <th scope="row">{key + 1}</th>
                                <td>{admin.full_name}</td>
                                <td>{admin.username} </td>
                                <td>{admin.description}</td>
                                
                                <td>{admin.active_inactive?"Former":"Active"}</td>
                                <td>
                                <Button
                                className="mr-4"
                                    onClick={e => {
                                      setEditForm(!editForm);
                                       setEditId(admin.id);
                                    }}
                                    color="primary"
                                  >
                                    {' '}
                                    Edit{' '}
                                  </Button>
                                  <Button
                                    onClick={() => setModal(!modal)}
                                    color="danger"
                                  >
                                    {' '}
                                    Delete{' '}
                                  </Button>
                                  <Modal
                                    isOpen={modal}

                                    //   className={props.className}
                                  >
                                    <ModalHeader>
                                      You cannot undo this action !
                                    </ModalHeader>
                                    <ModalBody>
                                      Are you sure, you want to delete{' '}
                                      {admin.username}? This could cause a
                                      loss of all the cohort's students
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        color="primary"
                                        onClick={() => deleteBranch(admin.id)}
                                      >
                                        Confirm
                                      </Button>{' '}
                                      <Button
                                        color="secondary"
                                        onClick={() => setModal(!modal)}
                                      >
                                        Cancel
                                      </Button>
                                    </ModalFooter>
                                  </Modal>
                                </td>
                              </tr>
                            
                          )}

                        </tbody>
                      </Table>
                    </Card>
                  
                </Col>
              
            </Row>
          </CardBody>
          <Button onClick={()=>props.history.goBack()} >Back</Button>
        </Card>
      </Col>
    </Row>
  );
};
export default BranchesInfo;
