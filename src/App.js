import logo from "./logo.svg";
import "./app.scss";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import PrivateRoute from "./routes/PrivateRoute";
import ResignPage from "./pages/Course";
import DefaultLayout from "./layout/defaultLayout";
import SchoolFeePage from "./pages/SchoolFeePage";
import CoursePage from "./pages/Course";
import NotFound from "./components/NotFound";
import UserPage from "pages/UserPage";

function App() {
  return (
    <Switch>
      <Route
        path="/login"
        exact="false"
        render={() => <AuthPage type="login" />}
      />

      <Route
        path="/"
        exact="false"
        render={() => (
          <DefaultLayout>
            <HomePage />
          </DefaultLayout>
        )}
      />

      {/* <Route
        path='/register'
        exact='false'
        render={() => <AuthPage type='register' />}
      /> */}
      <Route
        path="/contact"
        render={() => (
          <DefaultLayout>
            <ContactPage />
          </DefaultLayout>
        )}
      />
      <PrivateRoute
        path="/course"
        render={() => (
          <DefaultLayout>
            <CoursePage />
          </DefaultLayout>
        )}
      />
      <PrivateRoute
        path="/course/resign"
        exact="false"
        render={() => (
          <DefaultLayout>
            <ResignPage />
          </DefaultLayout>
        )}
      />
      <PrivateRoute
        path="/fee"
        exact="false"
        render={() => (
          <DefaultLayout>
            <SchoolFeePage />
          </DefaultLayout>
        )}
      />

      {/* Userpages */}
      <PrivateRoute
        path="/me"
        exact={false}
        render={() => (
          <DefaultLayout>
            <UserPage />
          </DefaultLayout>
        )}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
