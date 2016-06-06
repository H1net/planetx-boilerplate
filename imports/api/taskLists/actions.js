/*
  functions exported from this file are used in
  *  methods.js
  *  server/publications.js
  *  *.tests.js
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Lists } from './collections.js';

const clientCheck = ()=> Meteor.isClient;

export const TaskListActions = ()=> {
  const subscr =()=> {
    if(clientCheck){
      Meteor.subscribe('tasks');
    }
  };

  const all = {subscr}
  const find = {all}

  return {find};
};
