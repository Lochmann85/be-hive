const PASSWORD_LENGTH = 6;

export default {
   validator: function (newPassword) {
      return (newPassword.length >= PASSWORD_LENGTH);
   },
   message: "The password is not of the required length (6+)."
};