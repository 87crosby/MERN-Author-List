// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import AllAuthors from './components/AllAuthors';
import NewAuthor from './components/NewAuthor';
import Edit from './components/Edit';
import styles from './components/Author.module.css'
import {
  BrowserRouter,
  Switch,
  Route,
  Link 
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h1>Favorite Authors</h1>
      <Link className="btn btn-success" to="/new">Add an Author</Link>
      <Switch>
        <Route exact path="/">
          <AllAuthors></AllAuthors>
        </Route>
        <Route exact path="/new">
          <NewAuthor></NewAuthor>
        </Route>
        <Route exact path="/author/edit/:idParam">
          <Edit></Edit>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
