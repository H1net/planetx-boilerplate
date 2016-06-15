import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import React, { Component, PropTypes } from 'react';

import CompletedToggler from './CompletedToggler.jsx';

// TaskHeader component
// - Displays Title
// - Show/Hide Completed Toggler
class TaskHeader extends Component {
  render() {
    const styles = {
      header: {
        position:       "relative",
        display:        "block",
        width:          "100%",
        height:         "26px",
        paddingBottom:  "1px",
        marginBottom:   "12px",
        borderBottom:   "1px solid rgba(85, 190, 190, 0.69)",
      },
      title: {
      position:         "absolute",
      top:                1,
      left:               0,
      marginLeft:         4,
      fontSize:          20,
      },
      toggler: {
        position:       "absolute",
        top:              0,
        right:            0,
        marginRight:      4,
      }
    }

    return (
      <div style={styles.header}>
        <span style={styles.title}>
          {this.props.title}
        </span>
        <span style={styles.toggler}>
          <CompletedToggler
            key={this.props.listId}
            visibilityFilter={this.props.visibilityFilter}
            dispatch={this.props.dispatch}
          />
        </span>
      </div>
    );
  }
}


const TaskHeaderContainer = createContainer(({ visibilityFilter }) => {
  return { visibilityFilter };
}, TaskHeader);


const mapStateToProps = (state) => {
  return {
    visibilityFilter: state.visibilityFilter
  }
};

export default connect(mapStateToProps)(TaskHeaderContainer);


// TaskHeader.propTypes = {
//   listId: PropTypes.string.isRequired,
//   title:  PropTypes.string.isRequired,
// };
