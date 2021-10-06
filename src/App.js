import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { CommitListPage } from "./components/CommitListPage";
import { RepoListPage } from "./components/RepoListPage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <RepoListPage />
          </Route>
          <Route path="/repo/:repoId" component={CommitListPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
