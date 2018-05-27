import {
   isEmail,
   isEmpty
} from 'validator';

export default {
   validator: function (newEMail) {
      return isEmail(newEMail) && !isEmpty(newEMail);
   },
   message: "Please provide a correct E-Mail."
};