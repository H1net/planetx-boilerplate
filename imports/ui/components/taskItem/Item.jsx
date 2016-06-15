import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';

import Paper from 'material-ui/Paper';
import TaskTitle    from './Title.jsx'
import TaskCompleteBtn from './SetComplete.jsx';
import UnCompleteTask from './UnComplete.jsx';
import RemoveTaskBtn   from './Remove.jsx';
import TaskGoal from './goal/TaskGoal.jsx';

// TaskItem: a single task item
class TaskItem extends Component {
  render() {
    const style = {
      marginTop: 2,
      padding: "4px 0",
    };
    const isCompleted = this.props.isCompleted;

    if(isCompleted){
      return (
        <Paper style={style} zDepth={1} rounded={true} children={this.renderCompletedItem()}/>
      );
    }
    else {
      return (
        <Paper style={style} zDepth={1} rounded={true} children={this.renderIncompleteItem()}/>
      );
    }
  }

  renderCompletedItem() {
    // import TaskStats   from './Stats.jsx';
    //   <TaskStats
    //     taskId = {this.props.taskId}
    //   />
    
    const style = {
      position: "relative",
      width: "100%",
      height: "100%",
    };
    return (
      <div style={style}>
        <TaskTitle
          title = {this.props.text}
          isCompleted = {this.props.isCompleted}
        />
        <UnCompleteTask
          taskId = {this.props.taskId}
          onComplete = {this.props.onComplete}
        />
      </div>
    );
  }
  renderIncompleteItem() {
    const style = {
      position: "relative",
      width: "100%",
      height: "100%",
    };
    const notGoaled = (
      <div style={style}>
        <TaskCompleteBtn
          taskId =      {this.props.taskId}
          onComplete =  {this.props.onComplete}
        />
        <TaskTitle
          title =       {this.props.text}
          isCompleted =   {this.props.isCompleted}
        />
        <TaskGoal
          taskId =      {this.props.taskId}
          completeBy =  {this.props.completeBy}
          onGoalset =   {this.props.onGoalset}
        />
        <RemoveTaskBtn
          taskId =      {this.props.taskId}
          onDelete =    {this.props.onDelete}
        />
      </div>
    );
    const isGoaled = (
      <div style={style}>
        <TaskCompleteBtn
          taskId =      {this.props.taskId}
          onComplete =  {this.props.onComplete}
        />
        <TaskGoal
          taskId =      {this.props.taskId}
          completeBy =  {this.props.completeBy}
          onGoalset =   {this.props.onGoalset}
        />
        <TaskTitle
          title =       {this.props.text}
          isCompleted =   {this.props.isCompleted}
        />
        <RemoveTaskBtn
          taskId =      {this.props.taskId}
          onDelete =    {this.props.onDelete}
        />
      </div>
    );
    if(this.props.isGoaled){
      return isGoaled;
    } else {
      return notGoaled;
    }
  }
}

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  isGoaled: PropTypes.bool.isRequired,
  onGoalset: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const TaskItemContainer = createContainer( ({ taskId, text, isCompleted, onComplete, isGoaled, completeBy, onGoalset, onDelete })=> {
  return {
    taskId: taskId,
    text: text,
    isCompleted: isCompleted? true:false,
    onComplete: onComplete,
    isGoaled: isGoaled,
    completeBy: completeBy,
    onGoalset: onGoalset,
    onDelete: onDelete
  };
}, TaskItem);

export default connect()(TaskItemContainer);
