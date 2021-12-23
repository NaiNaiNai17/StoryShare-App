const bcrypt = require("bcrypt");
const User = require('../models/JwtUser');
const authHelper = require('../helpers/authHelper')
exports.registerUser = async (req, res) => {
  try {
    //take password supplied by client
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //make a new user with the following
    const user = new User();

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = hashedPassword;
    await user.save();
    // send a message that the user has been created
    return res.status(200).json({ message: "User Created" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "There has been a problem creating the user", error });
  }
};

exports.login = async (req, res) => {
  //STEP1 check if user with email exists?
  const user = await User.findOne({ email: req.body.email });

  if (user == null) {
    return res
      .status(404)
      .json({ message: "User with that email was not found" });
  }
  //STEP2 check if password is matching
  try {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (checkPassword) {
      //password is matching
      //Generate JWT token here
      //STEP3 issue a token for this user
      const token = await authHelper.generateToken(user);

      return res.status(200).json({ token: token });
    } else {
      return res.status(400).json({ message: "Passwords not matching" });
    }
  } catch (error) {
    console.log("the error ", error);
    return res.status(400).json({ message: "General error upon signing in." });
  }
};
