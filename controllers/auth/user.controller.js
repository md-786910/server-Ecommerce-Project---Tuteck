const { generateToken } = require("../../authentication/jwt");
const bcrypt = require("bcrypt");
const sendMail = require("../../utils/mailer");
const randomstring = require("randomstring");

// ---------------Register---------------
const Register = async (req, res) => {
  try {
    const Model = req.model;
    const { name, email, password, confirm_password } = req.body;

    if (!email || !password || !name || !confirm_password) {
      return res.status(400).json({
        status: false,
        message: "Required fields missing",
      });
    }
    if (password !== confirm_password) {
      return res.status(400).json({
        status: false,
        message: "passoword does not matched",
      });
    }
    const exitEmail = await Model.findOne({
      where: {
        email: email,
      },
    });
    if (exitEmail) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    } else {
      const user = await Model.create({
        name: name,
        email: email,
        password: password,
      });
      const info = await sendMail(
        email,
        "Register successfully",
        "Welcome to our website"
      );
      // const token = generateToken(user);

      return res.status(201).json({ status: true, data: user, info: info });
    }
  } catch (e) {
    res.status(400).send({ message: e.message, status: false });
  }
};

const GetRegister = async (req, res) => {
  const model = req.model;
  const data = await model.findAll({});

  res.json(data);
};
// ---------------Login---------------

const Login = async (req, res) => {
  try {
    const Model = req.model;
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await Model.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Invalid credential create new account" });
    }

    // match password with db password
    const passwordHash = user.password;
    const match = await bcrypt.compare(password, passwordHash);
    if (!match) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
    const token = generateToken(user);
    return res.status(201).send({ status: true, data: user, token: token });
  } catch (e) {
    res.status(401).send({ status: false, message: "Register account!" });
  }
};

// ---------------ForgotPassword---------------

const ForgotPassword = async (req, res) => {
  const Model = req.model;

  const { email } = req.body;

  if (!email) return res.status(400).send({ message: "Email is required" });
  const user = await Model.findOne({
    where: { email: email },
  });
  if (!user) {
    return res.status(400).send({ message: "Invalid Email" });
  }
  const password = randomstring.generate({
    length: 7,
    charset: "alphabetic",
  });
  try {
    const genPassword = await bcrypt.hash(password, 10);
    user.password = genPassword;
    await user.save();
    const sendOrNot = sendMail(
      email,
      "Your New Password",
      `
      <h3>Password : <b>${password}</b></h3>
      <p>please change your password after login</b></p>
      `
    );
    if (sendOrNot) {
      return res
        .status(201)
        .send({ status: true, message: "successfully send message" });
    } else {
      return res.status(400).send({ message: "Not Send Mail", status: false });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send({ message: "Not Authorized", status: false });
  }
};

// ---------------ResetPassword---------------

const ResetPassword = async (req, res) => {
  const Model = req.model;
  const { id, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    res
      .status(401)
      .json({ message: "password does not matched", status: false });
  }
  const user = await Model.findOne({
    where: { id: id },
  });

  if (!user) {
    return res.status(400).send({ message: "user does'nt exist" });
  }

  try {
    const genPassword = await bcrypt.hash(password, 10);
    user.password = genPassword;
    await user.save();

    const sendOrNot = sendMail(
      user.email,
      "Password have been successfully changed",
      `
         <p>you can now login</b></p>
        `
    );
    if (sendOrNot) {
      return res
        .status(201)
        .send({ status: true, message: "successfully send message" });
    } else {
      return res.status(400).send({ message: "Not Send Mail", status: false });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send({ message: "Not Authorized", status: false });
  }
};

module.exports = {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  GetRegister,
};
