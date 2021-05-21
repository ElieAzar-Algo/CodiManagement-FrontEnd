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

  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState();
  const [roleName, setRoleName] = useState("Roles");

  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState();
  const [branchName, setBranchName] = useState("Branches");

  const [adminInputs, setAdminInputs] = useState([]);

  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [errors, setErrors] = useState(false);

  const catchInput = e => {
    e.persist();
    setAdminInputs({
      ...adminInputs,
      [e.target.name]: e.target.value,
    });
    console.log(adminInputs);
  };

  const getMentors = async () => {
    const res = await fetch('http://localhost:8000/api/all-admins');
    const result = await res.json();
    setAdmins(result.data);
   // console.log(result.data)
    
  };

  const getBranches = async () => {
    const res = await fetch('http://localhost:8000/api/branch');
    const result = await res.json();
    setBranches(result.data);
    console.log(result.data)
  };

  const getRoles = async () => {
    const res = await fetch('http://localhost:8000/api/role');
    const result = await res.json();
    setRoles(result.data);
    console.log(result.data)
  };

  const createAdmin = async e => {
    e.preventDefault();
    const token=localStorage.getItem('adminToken')
    //console.log(token)
    const response = await fetch('http://localhost:8000/api/admin/create-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        ...adminInputs,    
        branch_id:branchId,
        role_id:roleId,
        active_inactive:1
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      setCreateForm(!createForm)
      getMentors();
      // window.location.reload();
    } else {
      setErrors(result.errors);
    }
  };
  

  const deleteAdmin = async () => {
    const deleteRequestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(
      `http://localhost:8000/api/admin/${deleteId}`,
      deleteRequestOptions,
    );
    const result = await res.json();

    console.log(result.message);
    setModal(!modal);
    getMentors();

  };

  useEffect(() => {
    getMentors();
    getBranches();
    getRoles();
    
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
                <Label for="branch" sm={5}>
                  Branches
                  </Label>
                <Col sm={7}>
                  <UncontrolledButtonDropdown addonType="append">
                    <DropdownToggle caret> {branchName} </DropdownToggle>
                    <DropdownMenu>
                      {branches.map((branch, branchKey) => (
                        <DropdownItem
                          key={branchKey}
                          onClick={() => {
                            
                            setBranchId(branch.id);
                            setBranchName(branch.branch_name);
                          }}
                        >
                          {branch.branch_name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  {errors.branch_id ? (
                      <UncontrolledAlert color="danger">
                        {errors.branch_id}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="role" sm={5}>
                  Roles
                  </Label>
                <Col sm={7}>
                  <UncontrolledButtonDropdown addonType="append">
                    <DropdownToggle caret> {roleName} </DropdownToggle>
                    <DropdownMenu>
                      {roles.map((role, roleKey) => (
                        <DropdownItem
                          key={roleKey}
                          onClick={() => {
                            
                            setRoleId(role.id);
                            setRoleName(role.role);
                          }}
                        >
                          {role.role}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  {errors.role_id ? (
                      <UncontrolledAlert color="danger">
                        {errors.role_id}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                </Col>
              </FormGroup>


                    <FormGroup row>
                      <Label for="full_name" sm={5}>
                        Full Name
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder=""
                          onChange={catchInput}
                          name="full_name"
                        />
                        {errors.full_name ? (
                          <UncontrolledAlert color="danger">{errors.full_name} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="username" sm={5}>
                        Username
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          onChange={catchInput}
                          name="username"
                        />
                        {errors.username ? (
                          <UncontrolledAlert color="danger">{errors.username} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="email" sm={5}>
                        Email
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="email"
                          onChange={catchInput}
                          name="email"
                        />
                        {errors.email ? (
                          <UncontrolledAlert color="danger">{errors.email} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                        
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="password" sm={5}>
                        Password
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="password"
                          onChange={catchInput}
                          name="password"
                        />
                        {errors.password ? (
                          <UncontrolledAlert color="danger">{errors.password} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="description" sm={5}>
                        Description
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          onChange={catchInput}
                          name="description"
                        />
                        {errors.description ? (
                          <UncontrolledAlert color="danger">{errors.description} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <Button color="primary" onClick={createAdmin}>
                          Submit
                        </Button>
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
                        <Button color="primary" onClick=''>
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
                                
                                <td>{!admin.active_inactive?"Former":"Active"}</td>
                                <td>
                               <Link to={{ 
                                 pathname: `/mentor-profile/${admin.id}`,
                                 state: { roles:roles, branches:branches }
                               
                              }}> <Button
                                className="mr-4"
                                    color="primary"
                                    size='sm'
                                  >
                                    {' '}
                                    See Profile{' '}
                                  </Button>
                                  </Link>
                                  <Button
                                    onClick={() => {
                                      setModal(!modal)
                                      setDeleteId(admin.id)
                                    }}
                                    color="danger"
                                    size='sm'

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
                                      {admin.username}'s Profile?
                                      
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        color="primary"
                                        onClick={() => deleteAdmin()}
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
