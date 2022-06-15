const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const middlewares = jsonServer.defaults({
  static: "/build",
});

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/events/*": "/$1",
  })
);
server.use(router);

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.listen(3005, () => {
  console.log("JSON Server is running");
});
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://sebastian:potoczak@cluster0.x2xwz05.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
),
  app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
      const newPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        password: newPassword,
        admin: false,
      });
      res.json({ status: "ok" });
    } catch (err) {
      res.json({ status: "error", error: "Duplicate email" });
    }
  });

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    const phone = jwt.sign(
      {
        phones: user.phone,
      },
      "secret123"
    );

    const surname = jwt.sign(
      {
        surname: user.surname,
      },
      "secret123"
    );
    const admin = jwt.sign(
      {
        admin: user.admin,
      },
      "secret123"
    );

    return res.json({
      status: "ok",
      user: token,
      phones: phone,
      surname: surname,
      admin: admin,
    });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
