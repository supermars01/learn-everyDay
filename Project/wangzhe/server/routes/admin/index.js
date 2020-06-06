module.exports = app => {
  const express = require("express");
  const route = express.Router();
  const assert = require("http-assert");
  const Category = require("../../models/Category");
  //查询分类
  route.get("/categories", async (req, res) => {
    const model = await Category.find().limit(10);
    res.send(model);
  });
  route.get("/categories/:id", async (req, res) => {
    const model = await Category.findById(req.params.id);
    assert(model, 401, "此项不存在");
    res.send(model);
  });
  //新增分类
  route.post("/categories", async (req, res) => {
    const model = await Category.create(req.body);
    res.send({
      code: 1,
      model
    });
  });
  //删除分类
  route.delete("/categories/:id/delete", async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id);
    assert(model, 401, "分类不存在");
    res.send({
      code: 1
    });
  });
  //修改分类
  route.put("/categories/:id/update", async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    assert(model, 401, "分类不存在");
    res.send({
      code: 1,
      model
    });
  });
  app.use("/admin/api", route);
};
