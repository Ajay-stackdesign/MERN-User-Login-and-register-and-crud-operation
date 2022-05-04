import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./component/Home.js"
import Login from "./component/user/Login"
import Register from "./component/user/Register"
import Homes from "./component/Home/Homes.js"
import AddBook from "./component/Book/AddBook.js"
import UpdateBook from "./component/Book/UpdateBook.js"
import Header from "./component/Home/Header.js"
import GetAll from "./component/Home/GetAll.js"
import Contact from "./component/Home/Contact.js"

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Homes} />
        <Route exact path='/home' component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/add" component={AddBook} />
        <Route exact path="/getall" component={GetAll} />
        <Route exact path="/update/:id" component={UpdateBook} />
        <Route exact path='/contact' component={Contact} />
      </Switch>
    </Router>
  );
}

export default App;
