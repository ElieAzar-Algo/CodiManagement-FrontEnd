import React, { useEffect, useState, useMemo } from 'react';
// import CountrySelector from '../components/CountrySelector'
import Select from 'react-select'
import countryList from 'react-select-country-list'
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

const CreateUser = props => {
  const [cohorts, setCohorts] = useState([]);
  const [UserCohort, setUserCohort] = useState();
  const [cohortName, setCohortName] = useState('Cohorts');
  const [gender, setGender] = useState('Gender');
  const [userInputs, setUserInputs] = useState([]);
  const [errors, setErrors] = useState([]);

  const [value, setValue] = useState('')

  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = value => {
    setValue(value)
  }

  const getCohorts = async () => {
    const response = await fetch('http://localhost:8000/api/only-cohorts');
    const result = await response.json();
    setCohorts(result.data);
  //  console.log(result.data)
  };
  const catchInput = e => {
    e.persist();
    setUserInputs({
      ...userInputs,
      [e.target.name]: e.target.value,
    });
    // console.log(userInputs);
  };

  const createUser = async e => {
    // console.log(value)
    e.preventDefault();
   const photo= document.querySelector('#user_avatar').files[0]
   //console.log(photo)
    const body =new FormData();
    body.append('active_inactive',1);
    body.append('cohort_code',UserCohort);
    body.append('user_gender',gender);
    body.append('user_gender',gender);
    body.append('user_avatar',photo);
    body.append('user_nationality',value.label);
    // Object.keys(userInputs).map((key, index)=>{
      
    //   body.append(key, userInputs[key])
    // //  console.log(key,userInputs[key] )
    // })
   // console.log(body);
  
   // body.append({...userInputs},);

    const response = await fetch('http://localhost:8000/api/user', {
      method: 'POST',
     /*  headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      }, */
      body
    });
    const result = await response.json();
    // console.log(result);
    if (result.success) {
      console.log("success", result);
      setErrors(result);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    } else {
      console.log("success", result);
      setErrors(result.errors);
    }
  };

  useEffect(() => {
    getCohorts();
  }, []);
  return (
    <>
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
                      placeholder="example: Adam"
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
                      placeholder="example: Azar"
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
                      placeholder="example@mail.com"
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
                      placeholder="password"
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
                      placeholder="example: 0096170123456"
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
                    {errors.user_birth_date ? (
                      <Alert color="danger">{errors.user_birth_date} </Alert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                
               



                <FormGroup row>
                  <Label for="gender" sm={4}>
                    Gender
                  </Label>
                  <Col sm={8}>
                    <UncontrolledButtonDropdown addonType="append">
                      <DropdownToggle caret> {gender} </DropdownToggle>
                      <DropdownMenu>
                        
                          <DropdownItem onClick={()=>setGender('Female')}> Female</DropdownItem>
                          <DropdownItem onClick={()=>setGender('Male')}> Male</DropdownItem>
                      
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    {errors.user_gender ? (
                      <Alert color="danger">{errors.user_gender} </Alert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                {/* <FormGroup row>
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
                </FormGroup> */}
  
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
                      placeholder="Blg-Street-Town-"
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

                {/* <FormGroup row>
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
                </FormGroup> */}

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Upload a photo for you :
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="file"
                      id="user_avatar"
                      placeholder="Upload photo "
                      // onChange={catchInput}
                      name="user_avatar"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Nationality :
                  </Label>
                  <Col sm={8}>
                  <Select options={options} value={value} onChange={changeHandler} />
                    {/* <Input
                      type="text"
                      placeholder="Nationality"
                      onChange={catchInput}
                      name="user_nationality"
                    /> */}
                    {errors.user_nationality ? (
                      <Alert color="danger">{errors.user_nationality} </Alert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                <Button color="success" onClick={createUser}>
                  Submit
                </Button>
              </Form>
            </CardBody>
            
          </Card>
          <Button onClick={()=>props.history.goBack()} >Back</Button>
        </Col>
      </Row>
    </>
  );
};
export default CreateUser;
