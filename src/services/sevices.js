import { users } from "../../users";

export const loginProcess = (password) => {
  var specificUser = "";

  //DATABASE  needed in here, for the one time password
  users.forEach((user) => {
    if (user.one_time_password == password) specificUser = user;
  });
  return specificUser;
};
