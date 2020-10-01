import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// for dashboard
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import routes from './routes';



export const apiURL = "http://localhost:8080/react-tutorials/src/api/";

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
     const routing = useRoutes(routes);
    return (
      <Router>
       <Routes>
         <Route exact path="/dashboard">
             <ThemeProvider theme={theme}>
              <GlobalStyles />
              {routing}
            </ThemeProvider>
         </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Routes>
      </Router>
    );
  }
}
