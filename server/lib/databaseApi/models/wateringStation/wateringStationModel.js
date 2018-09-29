import mongoose from 'mongoose';

/**
 * @public
 * @function create
 * @description watering station schema factory
 * @param {object} dbConnection - the connection to the database
 * @returns {Promise} of database watering station model
 */
const create = (
   dbConnection
) => {
   const wateringStationSchema = new mongoose.Schema({
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
      },
      index: {
         type: Number,
      },
      isActive: {
         type: Boolean,
         required: true,
      },
      wateringTimes: [{
         time: {
            type: String,
         },
         duration: {
            type: Number,
         }
      }]
   });

   return Object.freeze({
      name: "wateringStation",
      schema: dbConnection.model("WateringStation", wateringStationSchema),
   });
};

export {
   create
};