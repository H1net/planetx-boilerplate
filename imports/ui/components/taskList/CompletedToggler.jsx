import WHYUP from '../../../dev/whyup.js';

import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import setVisibilityFilter from '../../actions/setVisibility.js';

// TaskHeader component - Show/Hide Completed Toggler
class CompletedToggler extends Component {
  render() {
    const visFilter = this.props.visibilityFilter;
    const dispatch = this.props.dispatch;

    const handleShowCompleted = ()=> {
      const newFilter = visFilter === 'SHOW_ALL'? 'SHOW_ACTIVE' : 'SHOW_ALL';
      dispatch(setVisibilityFilter(newFilter));
    }
    const toggled = visFilter === 'SHOW_ALL'? true:false;

    return  (
      <Toggle
        toggled=  {toggled}
        onToggle= {handleShowCompleted}
      />
    );
  }
}

CompletedToggler.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default CompletedToggler;
