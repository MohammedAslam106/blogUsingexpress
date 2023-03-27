const DataBase=require("./db")
const express=require("express")

const database=new DataBase()
const app=express()


app.use(express.json())

app.get("/blogs",(req,res)=>{
    const data=database.read("blogs")
    res.json(data)
})

app.post("/blogs",(req,res)=>{
    const data=req.body
    if(!data.title){
        res.status(400).send("Title is mandatory")
        return
    }
    database.create("blogs",{...data,createdDate:new Date().toISOString().slice(0,9),updatedDate:new Date().toISOString().slice(0,9)})
    res.send("success")
})

app.get("/blogs/:id",(req,res)=>{
    const id=req.params.id
    const data =database.read("blogs",id)
    res.send(data)
})

app.patch("/blogs/:id",(req,res)=>{
    const id =req.params.id
    const data=req.body
    database.update("blogs",id,{...data,updatedDate:"now its updated"})
    res.send("success")
})

app.delete("/blogs/:id",(req,res)=>{
    const id=req.params.id
    database.delete("blogs",id)
    res.send("success")
})


app.listen(3000)