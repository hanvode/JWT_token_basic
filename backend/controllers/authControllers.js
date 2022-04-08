const User = require("../models/User");
const bcrypt = require("bcrypt"); // hash password
const jwt = require("jsonwebtoken");

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10); // ... hash password
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new User
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //Save to DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong username!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Wrong password!");
      }
      if (user && validPassword) {
        const accessToken =  jwt.sign(
          {
            id: user.id,
            admin: user.isAdmin,
          },
          process.env.JWT_Access_Key,
          { expiresIn: "30s" }
        );

        return res.status(200).json({user,accessToken});
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
