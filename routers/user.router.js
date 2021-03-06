const router = require("express").Router();
let users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
JWT_SECRET = process.env.JWT_SECRET;

// GET All USER DATA
router.get("/", (req, res) => {
  users
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});
router.delete("/deleteUser/:id", (req, res) => {
  users.find().then((res) => {
    res.forEach((user) => {
      const fr = user.friends;
      const frNew = fr.filter((friendId) => {
        return friendId != req.params.id;
      });
      user.friends = frNew;
      user.save();
    });
  });

  users
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// GET USER DATA
router.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  users
    .findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) console.log(err);
    });
});

// REGISTER NEW USER
router.post("/", async (req, res) => {
  const { name, userName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  let userNameExist = await users.findOne({ userName: userName.toLowerCase() });
  if (userNameExist) {
    res.send("userName is already used");
    return;
  }

  let emailExist = await users.findOne({ email: email.toLowerCase() });

  if (emailExist) {
    res.send("E-mail is already used");
    return;
  }

  users
    .create({
      name: name,
      userName: userName.toLowerCase(),
      email: email.toLowerCase(),
      password: passwordHash,
    })
    .then(() => {
      res.send("done");
    })
    .catch((err) => {
      if (err) res.send("email is already used");
    });
});

// CHECK USER FOR SIGN IN
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  let u = await users.findOne({ email: email.toLowerCase() }).lean();
  if (u == null) {
    res.send("invalid email/password");
    return;
  }

  if (await bcrypt.compare(password, u.password)) {
    let Token = jwt.sign(u._id.toJSON(), JWT_SECRET);
    res.cookie("jwt", Token);
    res.json(Token);
  } else res.send("invalid email/password");
});

// UPDATE USER DATA
router.put("/editProfile/:id", async (req, res) => {
  const id = req.params.id;
  const { name, location, bio, gender, avatar, header } = req.body;
  await users.findByIdAndUpdate(id, {
    name,
    location,
    bio,
    gender,
    avatar,
    header,
  });
  res.end();
});

// FOR USERS
router.delete("/deleteAccount/:id", async (req, res) => {
  const id = req.params.id;
  users.find().then((res) => {
    res.forEach((user) => {
      const fr = user.friends;
      const frNew = fr.filter((friendId) => {
        return friendId != req.params.id;
      });
      user.friends = frNew;
      user.save();
    });
  });

  let u = await users.findByIdAndDelete(id);
  res.cookie("jwt", "", { maxAge: 1 });
  res.end();
});

// SIGN OUT
router.get("/signOut", async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    // res.redirect("/");
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
