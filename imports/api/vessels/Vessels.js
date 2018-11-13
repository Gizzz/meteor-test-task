import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export default Vessels = new Mongo.Collection('vessels');

Meteor.methods({
  'vessels.getLocationData'(mmsi) {
    check(mmsi, Number);

    console.log(mmsi)

    return 'foobar';
  },
});
