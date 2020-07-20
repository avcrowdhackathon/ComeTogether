import { users } from "../../users";
import auth from "@react-native-firebase/auth";

export const loginProcess = (password) => {
  var specificUser = "";

  //DATABASE  needed in here, for the one time password
  users.forEach((user) => {
    if (user.one_time_password == password) specificUser = user;
  });
  return specificUser;
};

// resetPassUser('1821re','18211821')

export const resetPassUser = async (oldPass, newPass) => {
  const user = auth().currentUser;
  const provider = auth.EmailAuthProvider;
  const authCredential = provider.credential(user.email, oldPass);
  await auth()
    .currentUser.reauthenticateWithCredential(authCredential)
    .then(data => {
      user.updatePassword(newPass).then(() => console.warn('password updated!!'))

    })
    .catch(err => console.warn('Wrong credentials'));
} 

export const deleteUser = async (password) => {
  const user = auth().currentUser;
  const provider = auth.EmailAuthProvider;
  const authCredential = provider.credential(user.email, password);
  await auth()
    .currentUser.reauthenticateWithCredential(authCredential)
    .then(data => {
      user.delete().then(() => console.warn('user deleted'))

    })
    .catch(err => console.warn('Wrong credentials'));
} 