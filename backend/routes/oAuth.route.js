const express = require("express");
const authRouter = express.Router();
const { UserModel } = require("../models/user.model");
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:"473334704297-84k62o5538rdfjumvg33pmk13di5ibe9.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://lillyput.onrender.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      var { name, email } = profile._json;
      let user;
      try {
        user = await UserModel.findOne({ email });
        if (user) {
          return cb(null, user);
        }
        user = new UserModel({ name, email });
        await user.save();
        return cb(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    let user = req.user;
    console.log(user);
    let id = user._id;
    console.log(`https://lillyput.vercel.app/html/dashboard.html?user=${id}`);
    res.redirect(
      `https://lillyput.vercel.app/html/dashboard.html?user=${id}`
    );
  }
);

module.exports = {
    authRouter
}