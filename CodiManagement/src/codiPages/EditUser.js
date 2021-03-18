import React, { useEffect, useState } from 'react';
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
  
  Alert,
  
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

const EditUser = props => {
  const [userInputs, setUserInputs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [UserCohort, setUserCohort] = useState();
  const [cohortName, setCohortName] = useState(props.userInfo.cohort_code);
  const [userActive, setUserActive] = useState(1);

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
    console.log(UserCohort)
    const userId = props.userInfo.id;
    const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...userInputs,
        active_inactive: userActive,
        cohort_code: UserCohort,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setErrors(result.errors);
    }
  };

  useEffect(() => {
    getCohorts();
  }, []);
  return (
    <>  
      {!errors.message ? (
       <Row><Col>   <Alert color="danger">CHANGE ONLY the info that you to edit </Alert>   </Col> </Row>) : (
        ''
      )}

      {errors.message ? (
        <Row className="m-2">
          <Col xl={12} lg={12} md={12}>
            <Alert color="success">{errors.message} </Alert>
          </Col>
        </Row>
      ) : (
        ''
      )}
      <Row className="m-2">
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Student Info</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Change to Alumni :
                  </Label>
                  <Col sm={7}>
                    <UncontrolledButtonDropdown addonType="append">
                      <DropdownToggle caret> {userActive?"Active":"Alumni"}  </DropdownToggle>
                      <DropdownMenu>
                       
                          <DropdownItem onClick={()=>setUserActive(1)}> Active </DropdownItem>
                          <DropdownItem onClick={()=>setUserActive(0)}> Alumni </DropdownItem>
                      
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    {errors.cohort_code ? (
                      <Alert color="danger">{errors.cohort_code} </Alert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

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
                      <Alert color="danger">{errors.cohort_code} </Alert>
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
                      placeholder={props.userInfo.user_first_name}
                      onChange={catchInput}
                      name="user_first_name"
                    />
                    {errors.user_first_name ? (
                      <Alert color="danger">{errors.user_first_name} </Alert>
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
                      placeholder={props.userInfo.user_last_name}
                      onChange={catchInput}
                      name="user_last_name"
                    />
                    {errors.user_last_name ? (
                      <Alert color="danger">{errors.user_last_name} </Alert>
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
                      placeholder={props.userInfo.email}
                      onChange={catchInput}
                      name="email"
                    />
                    {errors.email ? (
                      <Alert color="danger">{errors.email} </Alert>
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
                      placeholder="********"
                      onChange={catchInput}
                      name="password"
                    />
                    {errors.password ? (
                      <Alert color="danger">{errors.password} </Alert>
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
                      placeholder={props.userInfo.user_phone_number}
                      onChange={catchInput}
                      name="user_phone_number"
                    />
                    {errors.user_phone_number ? (
                      <Alert color="danger">{errors.user_phone_number} </Alert>
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
                      placeholder={props.userInfo.user_emergency_number}
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
                      placeholder={props.userInfo.user_discord_id}
                      onChange={catchInput}
                      name="user_discord_id"
                    />
                    {errors.user_discord_id ? (
                      <Alert color="danger">{errors.user_discord_id} </Alert>
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
          <Card>
            <CardHeader>Additional info</CardHeader>
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
                    <p>{props.userInfo.user_birth_date}</p>

                    {errors.user_birth_date ? (
                      <Alert color="danger">{errors.user_birth_date} </Alert>
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
                      placeholder={props.userInfo.user_nationality}
                      onChange={catchInput}
                      name="user_nationality"
                    />
                    {errors.user_nationality ? (
                      <Alert color="danger">{errors.user_nationality} </Alert>
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
                      <Alert color="danger">{errors.user_gender} </Alert>
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
                      placeholder={props.userInfo.user_city}
                      onChange={catchInput}
                      name="user_city"
                    />
                    {errors.user_city ? (
                      <Alert color="danger">{errors.user_city} </Alert>
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
                      placeholder={props.userInfo.user_address}
                      onChange={catchInput}
                      name="user_address"
                    />
                    {errors.user_address ? (
                      <Alert color="danger">{errors.user_address} </Alert>
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
                      placeholder={props.userInfo.user_security_level}
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
                      placeholder={props.userInfo.user_avatar}
                      onChange={catchInput}
                      name="user_avatar"
                    />
                  </Col>
                </FormGroup>
                <Button color="success" onClick={createUser}>
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default EditUser;
