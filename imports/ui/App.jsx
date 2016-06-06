import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import TaskLists from './pages/Lists.jsx';
import { TaskListModels } from '/imports/api/taskLists/models.js';
import { TaskListActions } from '/imports/api/taskLists/actions.js';

// App component - represents the whole app
class App extends Component {
  render() {
    TaskListActions().find.all.subscr();
    return ( <TaskLists lists={this.props.lists} /> );
  }
}

App.propTypes = {
  lists: PropTypes.array.isRequired,
};

export default createContainer(()=> {
  return {
    lists: TaskListModels().find.all.getdocs(),
  };
}, App );
