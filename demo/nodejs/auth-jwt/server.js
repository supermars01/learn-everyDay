const express = require('express')
const jwt = require("jsonwebtoken");
const assert = require("http-assert");
const { User }= require('./models')
const app =express()
app.set("secret", "i2u34y12oi3u4y8");
app.use(express.json())

app.get('/api/users',async (req,res)=>{
    const users = await User.find({})
    res.send(users)
})

app.post('/api/register',async (req,res)=>{
    const user =await User.create({
        username:req.body.username,
        password:req.body.password
    })
    res.send(user)
})

app.post('/api/login',async (req,res)=>{
    const user =await User.findOne({
        username:req.body.username
    })
    if(!user){
        return res.status(422).send({
            message:"用户名不存在"
        })
    }
    //用bcrypt解密 加密的 密码，把用户输入的密码 和 数据库密码做比对，
    const isPasswordValid = require("bcrypt").compareSync(
        req.body.password,
        user.password
    )
    if(!isPasswordValid){
        return res.status(422).send({
            message:"密码错误"
        })
    }
    //生成token令牌
    const token = jwt.sign({
        //user._id可能是对象格式的，所以保险起见 用String转化一下
        id:String(user._id)
    },app.get("secret"))
    res.send({
        user,
        token
    })
})

//验证token 登录态 中间件
const auth = async (req,res,next)=>{
    const token = String(req.headers.authorization).split(' ').pop()
    assert(token, 401, "请先登录");
    const { id } = jwt.verify(token,app.get('secret'))
    assert(id, 401, "请先登录");
    //将user 挂载到req 上去
    req.user = await User.findById(id)
    assert(req.user, 401, "请先登录");
    next()
}
//如果有判断登录态需求的 路由 加入auth中间件  
app.get('/api/profile',auth,async(req,res)=>{
    //此处取 req.user
    res.send(req.user)
})

app.listen(3001, ()=>{
    console.log("http://localhost:3001")
})