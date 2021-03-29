import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));


const BranchesInfo = React.lazy(() => import('./codiPages/BranchesInfo'));
const CohortInfo = React.lazy(() => import('./codiPages/CohortInfo'));
const UserProfile = React.lazy(() => import('./codiPages/UserProfile'));
const CreateUser = React.lazy(() => import('./codiPages/CreateUser'));
const AbsenceRequestsInfo = React.lazy(() => import('./codiPages/AbsenceRequestInfo'));
const Attendance = React.lazy(() => import('./codiPages/Attendance'));
const ViewAttendance = React.lazy(() => import('./codiPages/ViewAttendance'));
const ViewAttendanceDay = React.lazy(() => import('./codiPages/ViewAttendanceDay'));
const StagesInfo = React.lazy(() => import('./codiPages/StagesInfo'));
const StageTasks = React.lazy(() => import('./codiPages/StageTasks'));
const SoloTaskInfo = React.lazy(() => import('./codiPages/SoloTaskInfo'));
const UserSkills = React.lazy(() => import('./codiPages/UserSkills'));
const CreateSkillMap = React.lazy(() => import('./codiPages/CreateSkillMap'));
//StageTasks


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />

            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />


            <MainLayout breakpoint={this.props.breakpoint}>
              
              <React.Suspense fallback={<PageSpinner />}>
              <Route exact path="/branches-info" component={BranchesInfo} />
              <Route exact path='/cohort-info/:name/:id' component={CohortInfo} />
              <Route exact path='/user-profile/:name/:id' component={UserProfile} />
              <Route exact path='/create-user' component={CreateUser} />
              <Route exact path='/user-absence-requests/:id' component={AbsenceRequestsInfo} />
              <Route exact path='/attendance/:id' component={Attendance}/>
              <Route exact path='/view-attendance/:id' component={ViewAttendance}/>
              <Route exact path='/view-attendance-day/:id' component={ViewAttendanceDay}/>
              <Route exact path='/stages-info/:id' component={StagesInfo}/>
              <Route exact path='/stage-tasks/:id' component={StageTasks}/>
              <Route exact path='/solo-task-info/:id' component={SoloTaskInfo}/>
              <Route exact path='/user-skills/:id' component={UserSkills}/>
              <Route exact path='/create-skill-map/:id' component={CreateSkillMap}/>
              


                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/cards" component={CardPage} />
                <Route exact path="/widgets" component={WidgetPage} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/tables" component={TablePage} />
                <Route exact path="/badges" component={BadgePage} />
                <Route
                  exact
                  path="/button-groups"
                  component={ButtonGroupPage}
                />
                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
