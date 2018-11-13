import { Meteor } from 'meteor/meteor';

import Vessels from '../imports/api/vessels/Vessels.js';
import vesselsSeedData from '../imports/api/vessels/vesselsSeedData.json';

Meteor.startup(() => {
  // If the Vessels collection is empty, add some data.
  if (Vessels.find().count() === 0) {
    vesselsSeedData.forEach(item => Vessels.insert(item));
  }
});
