import React, { useEffect, useState, useLocation } from 'react';

import {
  Row, Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Modal,
  Alert, ModalBody, ModalFooter, ModalHeader, UncontrolledButtonDropdown, Table,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import { UserCard } from '../components/Card';
import user1Image from '../assets/img/users/100_1.jpg';

const MentorProfile = (props) => {
  const [mentor, setMentor] = useState([]);
  const [mentorInputs, setMentorInputs] = useState([]);
  const [errors, setErrors] = useState(false);
  const [edit, setEdit] = useState(false);

  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState();
  const [roleName, setRoleName] = useState();

  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState();
  const [branchName, setBranchName] = useState();
  const [activeInactive, setActiveInactive] = useState(-1);

  const mentorId = props.match.params.id;
 // const data=props.location.state;
  //console.log(data)
  
  const catchInput = e => {
    e.persist();
    setMentorInputs({
      ...mentorInputs,
      [e.target.name]: e.target.value,
    });
    // console.log(taskInputs);
  };

  const getMentor = async () => {
    const res = await fetch(`http://localhost:8000/api/admin/${mentorId}`);
    const result = await res.json()
    console.log(result.data)
    setMentor(result.data)
    
  }

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

  const editProfile = async (id) => {

    const response = await fetch(`http://localhost:8000/api/admin/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...mentorInputs,
        role_id:roleId,
        branch_id:branchId,
        active_inactive:activeInactive
        
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      getMentor();
      setEdit(!edit)

     // window.location.reload();
    } else {
      setErrors(result.errors);
    }
  };

  
  useEffect(() => {
   getMentor();
   getBranches();
   getRoles();
   
  }, [])
  return (
    <>
      <Row>
        <Col xl={12} lg={12} md={12} md={5}>
          <UserCard
            avatar={user1Image}
            title={mentor.username}
            subtitle={mentor.active_inactive == 1 ? 'Active' : 'Former'}
            //text={props.match.params.name+ " Student"}
            style={{
              height: 300,
            }}
          />
        </Col>
      </Row>
      

      
        <Row className="m-2">
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>Mentor Info 
                  <Button
                  size="sm"
                  className="ml-3"
                  color='primary'
                  onClick={()=>setEdit(!edit)}>Edit My Profile</Button>
              </CardHeader>
              <CardBody>
                <Form>

                <FormGroup row>
                    <Label for="full_name" sm={5}>
                      Full Name :
                      </Label>
                    <Col sm={7}>
                      <Input
                      disabled={!edit}
                       plaintext={!edit}
                       defaultValue={mentor.full_name} 
                       name="full_name"
                       onChange={catchInput} 
                       />
                    </Col>
                  </FormGroup>

                  <FormGroup  hidden={!edit} row>
                    <Label for="username" sm={5}>
                      Username :
                      </Label>
                    <Col sm={7}>
                      <Input
                      disabled={!edit}
                      plaintext={!edit}

                       defaultValue={mentor.username} 
                       name="username"
                       onChange={catchInput} 
                        />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="email" sm={5}>
                      Email :
                      </Label>
                    <Col sm={7}>
                      <Input
                      disabled={!edit}
                      plaintext={!edit}

                       defaultValue={mentor.email} 
                       name="email"
                       onChange={catchInput} 
                        />
                    </Col>
                  </FormGroup>

                 
                  <FormGroup row>
                    <Label for="description" sm={5}>
                      Description :
                      </Label>
                    <Col sm={7}>
                      <Input
                      disabled={!edit}
                      plaintext={!edit}

                       defaultValue={mentor.description} 
                       name="description" 
                       onChange={catchInput} 
                       />
                    </Col>
                  </FormGroup>

                  <FormGroup  hidden={edit} row>
                    <Label for="role" sm={5}>
                      Role :
                      </Label>
                    <Col sm={7}>
                      <Input
                         disabled
                       plaintext 
                       defaultValue={mentor.role?mentor.role.role:""} 
                       name="role" />
                    </Col>
                  </FormGroup>

                  <FormGroup  hidden={!edit} row>
                <Label for="role" sm={5}>
                  Role
                  </Label>
                <Col sm={4}>
                  <UncontrolledButtonDropdown addonType="append">
                    <DropdownToggle caret> {roleName?roleName:mentor.role?mentor.role.role:"Roles"} </DropdownToggle>
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
                  
                </Col>
              </FormGroup>

              <FormGroup hidden={!edit} row>
                <Label for="branch" sm={5}>
                  Branches
                  </Label>
                <Col sm={4}>
                  <UncontrolledButtonDropdown addonType="append">
                    <DropdownToggle caret> {branchName?branchName:mentor.branch?mentor.branch.branch_name:"Branches"} </DropdownToggle>
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
                 
                </Col>
              </FormGroup>

                  <FormGroup  hidden={edit} row>
                    <Label for="branch" sm={5}>
                      Branch:
                      </Label>
                    <Col sm={7}>
                      <Input
                         disabled
                       plaintext 
                       defaultValue={mentor.branch?mentor.branch.branch_name:""} 
                       name="branch" />
                    </Col>
                  </FormGroup>
                  

                  <FormGroup hidden={!edit} row>
                <Label for="active" sm={5}>
                  Active
                  </Label>
                <Col sm={4}>
                  <UncontrolledButtonDropdown addonType="append">
                    <DropdownToggle caret> {activeInactive==1?"Active":activeInactive==0?"Former":activeInactive==-1?(mentor.active_inactive == 1 ? 'Active' : 'Former'):"Active/Inactive"} </DropdownToggle>
                    <DropdownMenu>
                      
                        <DropdownItem onClick={() => setActiveInactive(1)}>Active</DropdownItem>
                        <DropdownItem onClick={() => setActiveInactive(0)}>Former</DropdownItem>
                    
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                 
                </Col>
              </FormGroup>

                  <Button
                  hidden={!edit}
                  color="warning"
                  size="sm"
                  onClick={()=>editProfile(mentor.id)}>Submit Changes</Button>

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      {/* <Navbar>
        <Nav navbar>
          <NavItem>
            <SourceLink>
              <img
                src={codilogo}
                width="120"
                height="60"
                className="pr-2 ml-4"
                alt=""
              />
                Codi Tech Lebanon About us
              </SourceLink>
          </NavItem>
        </Nav>
      </Navbar> */}
    </>
  );
}
export default MentorProfile;

