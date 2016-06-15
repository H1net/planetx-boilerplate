import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import { TaskListViews } from '../../api/taskLists/views.js';
import { TaskListSubs } from '../../api/taskLists/subscriptions.js';
import TaskList from '../components/taskList/List.jsx';

// Lists Page - Show multiple lists
export default class TaskLists extends Component {
  render() {
    const style = {
      height: "100%",
      padding: "10px",
      minWidth: "300px",
      width: "100%",
      margin: "10px 0",
      textAlign: 'center',
      display: 'block',
    };

    console.log("THIS 3>", this);

    return (
      <Paper style={style} zDepth={1} rounded={false} children={this.renderTaskList()}/>
    );
  }

  renderTaskList() {
    return this.props.lists.map( (list)=> {
      const currKey = !list._id? Random.id() : list._id;

      return (
        // NOTE: I have to add this lists={} property to make an error go away
        <TaskList key={currKey} title={list.title} visibilityFilter={this.props.visibilityFilter} listId={list._id} lists={this.props.lists}/>
      );

    } );
  }
}

// http://guide.meteor.com/react.html#using-createContainer
const TaskListsContainer =  createContainer( ({ visibilityFilter })=> {
  TaskListSubs.find.all(visibilityFilter);
  return {
    lists: TaskListViews.find.all(visibilityFilter),
  };
}, TaskLists );

function mapStateToProps(state) {
  return {
    visibilityFilter: state.visibilityFilter,
  }
}

export default connect(mapStateToProps)(TaskListsContainer)

// TaskList.propTypes = {
//   lists: PropTypes.array.isRequired,
// };
