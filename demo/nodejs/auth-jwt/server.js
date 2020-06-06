const express = require("express");
const { User } = require("./models");
const jwt = require("jsonwebtoken");
const assert = require("http-assert");
const bcrypt = require("bcrypt");
const app = express();
app.set("secret", "aha&a^&a%%$a$sa");
app.use(express.json());
//查看users
app.get("/api/users", async (req, res) => {
  const user = await User.find();
  res.send(user);
});
//注册
app.post("/api/register", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  });
  res.send(user);
});
//登录
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  });
  assert(user, 422, "用户不存在");
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  assert(isPasswordValid, 422, "用户密码错误");
  const token = jwt.sign(
    {
      id: String(user._id)
    },
    app.get("secret")
  );
  res.send({
    user,
    token
  });
});
//验证登录态 中间件auth
const auth = async (req, res, next) => {
  const token = String(req.headers.authorization)
    .split(" ")
    .pop();
  assert(token, 401, "请先登录！");
  const { id } = jwt.verify(token, app.get("secret"));
  assert(id, 401, "请先登录！");
  req.user = await User.findById(id);
  assert(req.user, 401, "请先登录！");
  next();
};
//个人信息
app.get("/api/profile", auth, async (req, res) => {
  res.send(req.user);
});
app.listen(3001, () => {
  console.log("app is listening on 3001");
});
