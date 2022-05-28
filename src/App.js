import logo from "./logo.svg";
import "./app.scss";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import PrivateRoute, { AdminRoute } from "./routes/PrivateRoute";
import ResignPage from "./pages/Course";
import DefaultLayout from "./layout/defaultLayout";
import SchoolFeePage from "./pages/SchoolFeePage";
import CoursePage from "./pages/Course";
import NotFound from "./components/NotFound";
import UserPage from "pages/UserPage";
import Dashboard from "pages/Admin";
import Layout from "Layouts";
import Students from "pages/Admin/Students";
import { slugs } from "constants/slugs";
import Teachers from "pages/Admin/Teachers";
import Courses from "pages/Admin/Courses";

function App() {
  return (
    <Switch>
      <Route
        path='/login'
        exact='false'
        render={() => <AuthPage type='login' />}
      />

      <Route
        path='/'
        exact='false'
        render={() => (
          <DefaultLayout>
            <HomePage />
          </DefaultLayout>
        )}
      />

      <Route
        path='/register'
        exact='false'
        render={() => <AuthPage type='register' />}
      />
      <Route
        path='/contact'
        render={() => (
          <DefaultLayout>
            <ContactPage />
          </DefaultLayout>
        )}
      />
      <PrivateRoute
        path='/course'
        render={() => (
          <DefaultLayout>
            <CoursePage />
          </DefaultLayout>
        )}
      />
      <PrivateRoute
        path='/course/resign'
        exact='false'
        render={() => (
          <DefaultLayout>
            <ResignPage />
          </DefaultLayout>
        )}
      />
      <PrivateRoute
        path='/fee'
        exact='false'
        render={() => (
          <DefaultLayout>
            <SchoolFeePage />
          </DefaultLayout>
        )}
      />

      {/* Userpages */}
      <PrivateRoute
        path='/me'
        exact={false}
        render={() => (
          <DefaultLayout>
            <UserPage />
          </DefaultLayout>
        )}
      />
      <AdminRoute
        path='/dashboard'
        exact={true}
        render={() => (
          <Layout>
            <Dashboard />
          </Layout>
        )}
      />
      <AdminRoute
        path={slugs.adminStudent}
        exact={true}
        render={() => (
          <Layout>
            <Students />
          </Layout>
        )}
      />
      <AdminRoute
        path={slugs.adminTeacher}
        exact={true}
        render={() => (
          <Layout>
            <Teachers />
          </Layout>
        )}
      />
      <AdminRoute
        path={slugs.adminCourse}
        exact={true}
        render={() => (
          <Layout>
            <Courses />
          </Layout>
        )}
      />
      <Route path='*' component={NotFound} />
    </Switch>
  );
}

export default App;
