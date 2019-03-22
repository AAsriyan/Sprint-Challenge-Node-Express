import React, { Component } from "react";
import { Route } from "react-router-dom";

import ProjectList from "./components/ProjectList.js";
import Actions from "./components/Actions.js";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Lambda Projects</h1>
        <Route exact path="/" component={ProjectList} />
        <Route path="/projects/:id" component={Actions} />
      </div>
    );
  }
}

export default App;
