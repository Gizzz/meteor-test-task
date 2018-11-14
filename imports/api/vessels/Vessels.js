import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import axios from 'axios';

export default Vessels = new Mongo.Collection('vessels');

Meteor.methods({
  'vessels.getLocationData': async function(mmsi) {
    check(mmsi, Number);

    if (Meteor.isServer) {
      const url = `https://api.aprs.fi/api/get?name=${mmsi}&what=loc&apikey=109676.BrVSr9i6TpbMbBe&format=json`;
      const result = await axios.get(url).then(res => res.data);

      if (result.entries) {
        return { data: result.entries[0] };
      } else {
        return { error: result }
      }
    }
  },
});
