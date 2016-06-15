import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import _ from 'lodash'

import { TaskItemSubs } from '../../../api/taskItems/subscriptions.js';
import { TaskItemViews } from '../../../api/taskItems/views.js';

import TaskItem from '../taskItem/Item.jsx';
import { updateTask, deleteTask } from '../../../api/taskItems/methods.js';

// Task Items Component, renders multiple task items
class TaskItems extends Component {
  render() {
    const tasks = this.props.tasks;

    if (tasks) {
      const taskItems = [...tasks].map( (task)=> {
        return (
          <TaskItem
            key=          {task._id}
            taskId=       {task._id}
            text=         {task.text}
            isCompleted=  {task.completed? true:false}
            onComplete=   {this.onCompleteTaskItem}
            isGoaled=     {task.completeBy? true:false}
            completeBy=   {task.completeBy}
            onGoalset=    {this.onGoalsetTaskItem}
            onDelete=     {this.onDeleteTaskItem}
          />
        );
      });

      return (<div>{taskItems}</div>);
    }
    else { return (<div>Loading... </div>);}
  }

  onCompleteTaskItem = taskId => {
    const selector = {_id: taskId};
    let task = _.find(this.props.tasks, selector);
    const result = task.completed? false:true;

    updateTask.call({taskId: taskId, completed: result});
  }

  onDeleteTaskItem = taskId => {
    deleteTask.call({taskId: taskId}); //update DB
  }

  onGoalsetTaskItem = (taskId, completeBy) => {
    updateTask.call({taskId: taskId, completeBy: completeBy}); //update DB
  }
}

TaskItems.propTypes = {
  tasks: PropTypes.array.isRequired,
};

const TaskItemsContainer = createContainer( ({ visibilityFilter, listId })=> {
  const subscription = TaskItemSubs.find.select(visibilityFilter, listId);

  return {
    taskSubReady: subscription.ready(),
    tasks: TaskItemViews.find.select(visibilityFilter, listId) || [],
  }
}, TaskItems);

function mapStateToProps(state) {
  return {
    visibilityFilter: state.visibilityFilter,
  }
}

export default connect(mapStateToProps)(TaskItemsContainer);
