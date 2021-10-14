import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./Context/notes/NoteState";
import AlertState from "./Context/alert/AlertState";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NoteState>
      <AlertState>
        <Router>
          <Navbar />
            <Alert />
          <div className="container" >
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </div>
        </Router>
      </AlertState>
      </NoteState>
    </>
  );
}

export default App;
