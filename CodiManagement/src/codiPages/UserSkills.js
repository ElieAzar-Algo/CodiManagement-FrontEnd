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
  Input,
  Form,
  Modal,
  ModalBody, ModalFooter, ModalHeader,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledAlert

} from 'reactstrap';

const UserSkills = props => {
  const [studentSkills, setStudentSkills] = useState([]);
  const [students, setStudents] = useState([]);
  const [stages, setStages] = useState([]);
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState('Student');

  const [progress, setProgress] = useState();
  const [editForm, setEditForm] = useState(0);
  const [errors, setErrors] = useState(false);

  const cohortId = props.match.params.id;

  const handleIndexClick = sKey => {
    setEditForm(sKey);
  };


  const getStudentSkills = async () => {

    const res = await fetch(`http://localhost:8000/api/user-skills-stage/${studentId}`);
    const result = await res.json();
    console.log(result.data);
    setStudentSkills(result.data);
    //setStudentId(result.data[0].id)
  };

  const getCohortStudents = async () => {

    const res = await fetch(`http://localhost:8000/api/user-byCohort/${cohortId}`);
    const result = await res.json();
    // console.log(result.data);
    setStudents(result.data);

  };

  const getCohortStages = async () => {

    const res = await fetch(`http://localhost:8000/api/stage/${cohortId}`);
    const result = await res.json();
    // console.log(result.data);
    setStages(result.data);

  };

  const editProgress = async (id) => {
    const response = await fetch(`http://localhost:8000/api/skill-progress/${studentId}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        progress: progress,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);

    } else {
      setErrors(result.errors);
    }
  };



  useEffect(() => {
    getCohortStudents();
    getCohortStages()
  }, []);

  return (
    <Row>
      <Col>
        <Card className="mb-3">
          <CardHeader>Skill Map</CardHeader>
          <CardBody>
            <Row>
              <Col>
                <Row className="mb-2">
                  <Col sm={3}>
                    <UncontrolledButtonDropdown addonType="append">
                      <DropdownToggle caret> {studentName} </DropdownToggle>
                      <DropdownMenu>
                        {students.map((student, key) => (
                          <DropdownItem
                            key={key}
                            onClick={() => { setStudentId(student.id); setStudentName(student.user_first_name) }}>
                            {student.user_first_name} {student.user_last_name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </Col>
                  <Col sm={3}>

                    <Button
                      color="primary"
                      onClick={getStudentSkills}>
                      View {studentName}'s Skill Map
                  </Button>
                  </Col>
                </Row>
                <Row>
                  {/* ----------------------------------- */}


                  <Col>
                    <Card body>
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Skill Family</th>
                            <th>Skill</th>
                            {stages.map((st, stageKey) => (
                              <th key={stageKey}>{st.stage_name}</th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {!studentSkills ? <tr> <td><h3>No Skill Map Yet, Please Create A Skill Map For {studentName}</h3>
                            <Link to={{ pathname: `/create-skill-map/${cohortId}/student/${studentId}` }}><Button
                              className="ml-3"
                              color="info">Create Skill Map</Button></Link></td></tr> :

                            studentSkills.map((ts, key) => (


                              <tr key={key}>

                                <td>{ts.skill.skill_family}</td>
                                <td>{ts.skill.name}</td>

                                {stages.map((stg, stgKey) =>
                                  <td key={stgKey}>
                                    <Form onSubmit={(e) => {
                                      e.preventDefault(); editProgress(ts.id)
                                      const k = key + 1; handleIndexClick(k)
                                    }}>
                                      <Input
                                        max='3'
                                        min='0'
                                        type='number'
                                        className="w-50"
                                        defaultValue={ts.stage.id == stg.id ? ts.progress : ""}
                                        disabled={editForm !== key}
                                        onChange={(e) => setProgress(e.target.value)} />
                                    </Form>
                                  </td>
                                )}

                                <td>{ts.updated_at}</td>

                              </tr>

                            ))
                          }
                        </tbody>

                      </Table>
                    </Card>
                  </Col>

                </Row>
              </Col>
            </Row>
          </CardBody>
          <Row>
            <Button className='col-6' onClick={() => window.location.reload()} color="info">
              {' '}
            Finish{' '}
            </Button>

            <Button className='col-6' onClick={() => props.history.goBack()} >Back</Button>
          </Row>
        </Card>

      </Col>
    </Row>
  );
};
export default UserSkills;
