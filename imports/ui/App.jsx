import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import TaskLists from './pages/TaskLists.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    const { dispatch } = this.props;
    const lists = this.props.lists;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} className="container">
        <TaskLists />
      </MuiThemeProvider>
    );
  }
}


// App.childContextTypes = {
//   // https://github.com/shinol/simple-todos/blob/master/imports/ui/App.jsx
//   muiTheme: React.PropTypes.object
// };
//
// App.getChildContext =()=> {
//   // Key required to be "muiTheme"
//   // muiTheme: getMuiTheme(MyRawTheme)
//   return {
//     muiTheme: getMuiTheme(darkBaseTheme)
//   };
// };
