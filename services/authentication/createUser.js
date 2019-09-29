import admin from './firebaseService';

export const createUser = async (req, res) => {

    console.log(req.body)

    const {
      email,
      password,
    } = req.body;

    const user = await admin.auth().createUser({
      email,
      password,
    });

    return res.send(user);
}