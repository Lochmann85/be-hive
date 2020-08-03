const comparePassword = function (password) {
   const userPassword = this.password;

   return new Promise((resolve, reject) => {
      if (password === userPassword) {
         resolve();
      }
      else {
         reject({
            message: "Please provide the correct password.",
            path: "password"
         });
      }
   });
};

const users = [{
   id: "1",
   email: "georg.lochmann@gmail.com",
   name: "Georg Lochmann",
   password: "Test123",
   comparePassword,
}];

export {
   users
};