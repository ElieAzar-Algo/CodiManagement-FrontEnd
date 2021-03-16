//import Page from 'components/Page';
import './codiStyles/CodiDashboard.css';
import React,{useEffect,useState, useCallback}from 'react';
import {Link} from 'react-router-dom'
import { Card, CardBody, CardHeader, Col, Row, Table, Button, CardText,CardImg,CardTitle,Form,Input} from 'reactstrap';
import { NumberWidget, IconWidget } from 'components/Widget';
import { iconWidgetsData, numberWidgetsData } from 'demos/widgetPage';import {
  MdSearch,
  MdRoom
} from 'react-icons/md';

import codilogo from 'assets/img/logo/Codi-Logo.png';


const BranchesInfo = () => {

  const [branches, setBranches] = useState([]);
  const [individualBranch, setIndividualBranch] = useState([]);
  const [individualCohort, setIndividualCohort] = useState([]);
  const [search, setSearch] = useState([]);


  const [errors, setErrors] = useState(false);


  const getBranches=async ()=>{
    const res =await  fetch("http://localhost:8000/api/branch");
    const result=await res.json()
    setBranches(result.data)
    //console.log(students)
  }

  const getIndividualBranchInfo =async (id)=>{
    console.log(id)
    const res =await  fetch(`http://localhost:8000/api/branch/${id}`);
    const result=await res.json()
    setIndividualBranch(result.data)
    console.log(result.data)
  }

  const searchForCohort =async (e)=>{
    e.preventDefault()
    const res =await  fetch(`http://localhost:8000/api/searchCohort/${search}`);
    const result=await res.json()
    setIndividualCohort(result.data)
    console.log(result.data)
  }
  
  
  useEffect(()=>{
    
    getBranches();
    setIndividualBranch(null)
  },[])

  return (
    <Row>
      <Col>
        <Row className="ml-1 mr-1">
          {branches.map((branch, key) => (
            <Col
              key={key}
              lg={3}
              md={3}
              sm={6}
              xs={12}
              className="branchesWidgets mb-3"
            >
              <IconWidget
                bgColor="primary"
                icon={MdRoom}
                title={branch.branch_name}
                subtitle="Branch"
                onClick={e => getIndividualBranchInfo(branch.id)}
              />
            </Col>
          ))}
        </Row>
        <Card className="mb-3">
          <CardHeader>
           Search for cohort{' '}
            <Form
              inline
              className="cr-search-form"
              onSubmit={e => searchForCohort(e)}
            >
              <MdSearch
                size="20"
                className="cr-search-form__icon-search text-secondary"
              />
              <Input
                type="search"
                className="cr-search-form__input"
                placeholder="Search..."
                onChange={e => setSearch(e.target.value)}
              />
            </Form>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                {!individualBranch ? (
                  <Card className="flex-row">
                    <CardImg
                      className="card-img-left"
                      src={codilogo}
                      style={{ width: 'auto', height: 150 }}
                    />
                    <CardBody>
                      <CardTitle>Welcome To Codi Tech Branches Dashboard</CardTitle>
                      <CardText>
                        Please choose a branch to see more info
                      </CardText>
                    </CardBody>
                  </Card>
                ) : (
                  <Card body>
                    <Table hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Cohort</th>
                          <th>Start date</th>
                          <th>End date</th>
                          <th>Students Number</th>
                          <th>Admins Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {individualBranch.map((branch, key) =>
                          branch.cohorts.map((cohort, cohortKey) => (
                            <tr key={key}>
                              <th scope="row">{cohortKey+1}</th>
                              <td>{cohort.cohort_code}</td>
                              <td>{cohort.start_date} </td>
                              <td>{cohort.end_date}</td>
                              <td>{cohort.users.length}</td>
                              <td>{branch.admins.length}</td>
                              <td>
                                {' '}
                                <Link to ={{
                                  pathname: `/cohort-info/${branch.branch_name}/${cohort.id}`, 
                                  state: { 
                                      branch_name:"batata", 
                                      new_id:"", 
                                  }
                                }}>
                                  <Button color="info"> More Info </Button>
                                </Link>
                              </td>
                            </tr>
                          )),
                        )}

                        {/* <tr>
                        <th scope="row">2</th>
                        <td>Codi</td>
                        <td>Tech</td>
                        <td>@JIJI</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Hello</td>
                        <td>World</td>
                        <td>@Nice</td>
                      </tr> */}
                      </tbody>
                    </Table>
                  </Card>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default BranchesInfo;