import React, { useEffect, useState } from 'react';
import bg from '../assets/img/bg/background_1920-7.png';

import { Link, Redirect } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import {
  Row,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledAlert,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledUncontrolledAlert
} from 'reactstrap';
import { Navbar, Nav, NavItem } from 'reactstrap';
import codilogo from 'assets/img/logo/codi-logo.svg';
import SourceLink from 'components/SourceLink';


const Signup = props => {
  const [cohorts, setCohorts] = useState([]);
  const [UserCohort, setUserCohort] = useState();
  const [cohortName, setCohortName] = useState('Cohorts');
  const [userInputs, setUserInputs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [userID, setUserID] = useState([]);
  const [auth, setAuth] = useState([]);

  const getCohorts = async () => {
    const response = await fetch('http://localhost:8000/api/only-cohorts');
    const result = await response.json();
    setCohorts(result.data);
    //console.log(result.data)
  };
  const catchInput = e => {
    e.persist();
    setUserInputs({
      ...userInputs,
      [e.target.name]: e.target.value,
    });
    console.log(userInputs);
  };

  const createUser = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...userInputs,
        active_inactive: 1,
        cohort_code: UserCohort,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.access_token) {
        localStorage.setItem('userToken',result.access_token)
        localStorage.setItem('userID',result.user)
        setUserID(result.user);
        setAuth(result.status);
        props.history.push("/");
    } else {
      setErrors(result.errors);
    }
  };

  useEffect(() => {
    getCohorts();
  }, []);
  return (
    <>
     
      <Row  className="m-2">
        <Col xl={6} lg={12} md={12}>
          <Card style={{backgroundImage:"url("+bg+")",backgroundRepeat:"no-repeat"}}>
            <CardHeader style={{backgroundImage:"url("+bg+")",backgroundRepeat:"no-repeat"}}>Student Info</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Choose a cohort :
                  </Label>
                  <Col sm={7}>
                    <UncontrolledButtonDropdown addonType="append">
                      <DropdownToggle caret> {cohortName} </DropdownToggle>
                      <DropdownMenu>
                        {cohorts.map((coh, key) => (
                          <DropdownItem
                            key={key}
                            onClick={() => {
                              setUserCohort(coh.id);
                              setCohortName(coh.cohort_code);
                            }}
                          >
                            {coh.cohort_code}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    {errors.cohort_code ? (
                      <UncontrolledAlert color="danger">{errors.cohort_code} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    First Name :
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="text"
                      placeholder="example: Adam"
                      onChange={catchInput}
                      name="user_first_name"
                    />
                    {errors.user_first_name ? (
                      <UncontrolledAlert color="danger">{errors.user_first_name} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Last Name :
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="text"
                      placeholder="example: Azar"
                      onChange={catchInput}
                      name="user_last_name"
                    />
                    {errors.user_last_name ? (
                      <UncontrolledAlert color="danger">{errors.user_last_name} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Email :
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="email"
                      placeholder="example@mail.com"
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
                  <Label for="exampleEmail" sm={5}>
                    Password :
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="password"
                      placeholder="password"
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
                  <Label for="exampleEmail" sm={5}>
                    Phone Number :
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="number"
                      placeholder="example: 0096170123456"
                      onChange={catchInput}
                      name="user_phone_number"
                    />
                    {errors.user_phone_number ? (
                      <UncontrolledAlert color="danger">{errors.user_phone_number} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Emergency Number :
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="number"
                      placeholder="example: 0096170123456"
                      onChange={catchInput}
                      name="user_emergency_number"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Discord ID :
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="text"
                      placeholder="example: #5579"
                      onChange={catchInput}
                      name="user_discord_id"
                    />
                    {errors.user_discord_id ? (
                      <UncontrolledAlert color="danger">{errors.user_discord_id} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card style={{backgroundImage:"url("+bg+")",backgroundRepeat:"no-repeat"}}>
            <CardHeader style={{backgroundImage:"url("+bg+")",backgroundRepeat:"no-repeat"}}>Additional info</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Date Of Birth :
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="date"
                      name="user_birth_date"
                      onChange={catchInput}
                    />
                    {errors.user_birth_date ? (
                      <UncontrolledAlert color="danger">{errors.user_birth_date} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Nationality :
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      placeholder="Nationality"
                      onChange={catchInput}
                      name="user_nationality"
                    />
                    {errors.user_nationality ? (
                      <UncontrolledAlert color="danger">{errors.user_nationality} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Gender :
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      placeholder="example: Male/Female"
                      onChange={catchInput}
                      name="user_gender"
                    />
                    {errors.user_gender ? (
                      <UncontrolledAlert color="danger">{errors.user_gender} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    City :
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      placeholder="City name"
                      onChange={catchInput}
                      name="user_city"
                    />
                    {errors.user_city ? (
                      <UncontrolledAlert color="danger">{errors.user_city} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Address :
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      placeholder="Blg-Street-Town-"
                      onChange={catchInput}
                      name="user_address"
                    />
                    {errors.user_address ? (
                      <UncontrolledAlert color="danger">{errors.user_address} </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Security Level :
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="number"
                      placeholder="Between 1 and 3"
                      onChange={catchInput}
                      name="user_security_level"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Upload a photo for you :
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      placeholder="Upload photo "
                      onChange={catchInput}
                      name="user_avatar"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                   
                  </Label>
                  <Col sm={8}>
                  <Button className='col-6' color="success" onClick={createUser} > SIGNUP</Button>
                  <Link to="/" className='col-6'> <Button  >
            {' '}
            Back To Login{' '}
          </Button></Link>
                  </Col>
                </FormGroup>
                
              </Form>
            </CardBody>
           
          </Card>
          <Row>
         
          
          
          </Row>
        </Col>
      </Row>
      <Navbar>
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
        </Navbar>
    </>
  );
};
export default Signup;
