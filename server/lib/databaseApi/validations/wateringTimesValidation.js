const timezone = require("timezonecomplete");

const DURATION_BOUND = {
   LOWER: 5,
   UPPER: 240,
};
const TIME_EXCLUDED_RANGE = {
   HOUR: 0,
   MINUTE: {
      LOWER: 0,
      UPPER: 10
   }
};

const durationValidation = {
   validator(newDuration) {
      return DURATION_BOUND.LOWER >= newDuration || newDuration >= DURATION_BOUND.UPPER;
   },
   message: `The Duration has to be larger then ${DURATION_BOUND.LOWER} and smaller then ${DURATION_BOUND.UPPER}.`
};

const timeValidation = {
   validator(newTime) {
      const time = new timezone.DateTime(newTime, "HH:mm");

      const minute = time.minute();
      if (time.hour() === TIME_EXCLUDED_RANGE.HOUR &&
         TIME_EXCLUDED_RANGE.MINUTE.LOWER <= minute && minute <= TIME_EXCLUDED_RANGE.MINUTE.UPPER) {
         return {
            path: "time",
            message: `The time between 0:00 and 0:10 is not allowed.`
         };
      }
   },
   message: `The time between 0:00 and 0:10 is not allowed.`
};

const wateringTimesValidation = {
   validate(wateringTimes) {
      let errors = {},
         hasError = false;
      wateringTimes.forEach(wateringTime => {
         if (durationValidation.validator(wateringTime.duration) && !errors.duration) {
            errors.duration = {
               message: durationValidation.message,
               path: "duration"
            };
            hasError = true;
         }
         if (timeValidation.validator(wateringTime.time) && !errors.time) {
            errors.time = {
               message: timeValidation.message,
               path: "time"
            };
            hasError = true;
         }
      });

      if (hasError) {
         return Promise.reject({ errors });
      }
      else {
         return Promise.resolve();
      }
   }
};

export {
   durationValidation,
   timeValidation,
   wateringTimesValidation
};