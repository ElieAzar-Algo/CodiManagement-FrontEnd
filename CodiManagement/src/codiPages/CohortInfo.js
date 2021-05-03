//import Page from 'components/Page';
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
  // Form,
  // Input,
  // InputGroup,
  // InputGroupAddon,
  // UncontrolledButtonDropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu,
} from 'reactstrap';
import codilogo from 'assets/img/logo/Codi-Logo.png';
import './codiStyles/CodiDashboard.css';


const CohortInfo = props => {
  const [cohort, setCohort] = useState([]);
  //const [searchField, setSearchField] = useState('Choose a field ');
  //const [searchValue, setSearchValue] = useState(''); //search function is not completed
  const branchName = props.match.params.name;
  const cohortId = props.match.params.id;

  const getCohort = async () => {
    // console.log(branchName,cohortId);
    const res = await fetch(`http://localhost:8000/api/cohort/${cohortId}`);
    const result = await res.json();
    console.log(result.data);
    setCohort(result.data);
  };

  const searchForUser = async e => {
    e.preventDefault();
    const search = cohort.map(coh =>
      coh.users.filter(e => (e.user_first_name === 'Elie') > -1),
    );
    console.log(search);
  };

  useEffect(() => {
    getCohort();
  }, []);

  return (
    <Row>
      {!cohort ? (
        <Col>
          <Card className="flex-row">
            <CardImg
              className="card-img-left"
              src={codilogo}
              style={{ width: 'auto', height: 150 }}
            />
            <CardBody>
              <CardTitle>Welcome To Codi Tech cohort Dashboard</CardTitle>
              <CardText>Please choose a cohort to see more info</CardText>
            </CardBody>
          </Card>
        </Col>
      ) : (
          <Col>
            {cohort.map((coh, key) => (
              <Card className="mb-3">
                <CardHeader>
                  Cohort Info{' '}

                  <Card className="flex-row">
                    <CardImg
                      className="card-img-left"
                      src={codilogo}
                      style={{ width: 'auto', height: 150 }}
                    />

                    <CardBody>
                      <CardTitle>
                        {' '}
                        <h3>{coh.cohort_code}</h3>{' '}
                      </CardTitle>
                      <CardText>
                        <h5> {branchName} </h5>
                        <p>
                          started on {coh.start_date} Till {coh.end_date}{' '}
                        </p>
                        <p> has {coh.users.length} students </p>
                      </CardText>
                    </CardBody>
                  </Card>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <Row className="mb-2">
                        <Col>
                          <Link to="/create-user">
                            <Button className="mr-3" color="primary">
                              Create Student
                          </Button>
                          </Link>

                          <Link to={{ pathname: `/attendance/${cohortId}` }}>
                            <Button className="mr-3" color="primary">
                              Take cohort Attendance
                          </Button>
                          </Link>

                          <Link to={{ pathname: `/view-attendance/${cohortId}` }}>
                            <Button className="mr-3" color="primary">
                              View attendance individually
                          </Button>
                          </Link>

                          <Link to={{ pathname: `/activity-evaluation-admin/${cohortId}` }}>
                            <Button className="mr-3" color="primary">
                              Activity Evaluation
                          </Button>
                          </Link>

                          {/* <Link
                          to={{ pathname: `/view-attendance-day/${cohortId}` }}
                        >
                          <Button className="mr-3" color="primary">
                            View Attendance By Day
                          </Button>
                        </Link> */}

                          <Button className="mr-3" color="primary">
                            {' '}
                          Disable Cohort
                        </Button>

                        </Col>
                      </Row>

                      <Row className="mb-3 mt-3">
                        <Col>
                          <Link to={{ pathname: `/stages-info/${cohortId}` }}>
                            <Button className="mr-3 " color="primary">
                              Stages
                          </Button>
                          </Link>
                          <Link to={{ pathname: `/user-skills/${cohortId}` }}>
                            <Button className="mr-3" color="primary">
                              Skill Map
                          </Button>
                          </Link>

                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          {' '}
                          <Card body>
                            {/* Search for a Student{' '} */}
                            {/* <Form
                            inline
                            className="cr-search-form"
                            onSubmit={searchForUser}
                          >
                            <InputGroup>
                              <UncontrolledButtonDropdown addonType="append">
                                <DropdownToggle caret>
                                  {searchField}
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem
                                    onClick={() =>
                                      setSearchField('user_first_name')
                                    }
                                  >
                                    First Name
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() =>
                                      setSearchField('user_last_name')
                                    }
                                  >
                                    Last Name
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() =>
                                      setSearchField('user_gender')
                                    }
                                  >
                                    Gender
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() =>
                                      setSearchField('user_phone_number')
                                    }
                                  >
                                    Phone Number
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() =>
                                      setSearchField('user_nationality')
                                    }
                                  >
                                    Nationality
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => setSearchField('user_city')}
                                  >
                                    City
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() =>
                                      setSearchField('active_inactive')
                                    }
                                  >
                                    Active Students
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledButtonDropdown>
                              <Input
                                placeholder="and..."
                                onChange={e => setSearchValue(e.target.value)}
                              />
                              <InputGroupAddon addonType="append">
                                <Button
                                  onClick={searchForUser}
                                  color="secondary"
                                >
                                  Search
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                          </Form> */}
                            <Table responsive hover>
                              <thead>
                                <tr>
                                  <th>Student</th>
                                  <th>First name</th>
                                  <th>Last name</th>
                                  <th>Email</th>
                                  <th>Gender</th>
                                  <th>Active</th>
                                </tr>
                              </thead>

                              <tbody>
                                {coh.users.map((user, userKey) => (
                                  <tr key={userKey}>
                                    <td> {userKey + 1}</td>
                                    <td>{user.user_first_name}</td>
                                    <td>{user.user_last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.user_gender}</td>
                                    <td>
                                      {user.active_inactive ? 'Active' : 'Alumni'}
                                    </td>

                                    <td>
                                      {' '}
                                      <Link
                                        to={{
                                          pathname: `/user-profile/${user.id}`,
                                        }}
                                      >
                                        <Button color="info"> More Info </Button>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}

                              </tbody>
                            </Table>
                          </Card>{' '}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
                <Button onClick={() => props.history.goBack()} >Back</Button>
              </Card>

              //cohort map closings
            ))}
          </Col>
        )}
    </Row>
  );
};
export default CohortInfo;
