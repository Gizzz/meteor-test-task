import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import Vessels from '../imports/api/vessels/Vessels.js';
import vesselsSeedData from '../imports/api/vessels/vesselsSeedData.json';

Meteor.startup(() => {
  // If the Vessels collection is empty, add some data.
  if (Vessels.find().count() === 0) {
    const schema = new SimpleSchema({
      Type: { type: String, required: true },
      Name: { type: String, required: true },
      IMO: { type: Number, required: true },
      CS: { type: String, required: true },
      MMSI: { type: Number, required: true },
      Length: { type: String, required: true },
    });

    vesselsSeedData.forEach(item => {
      const validationContext = schema.newContext();
      validationContext.validate(item);

      if (validationContext.isValid()) {
        Vessels.insert(item);
      }
    });
  }
});
