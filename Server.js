const express=require("express")

const path=require("path")

const app=express()

const bodyparser=require("body-parser")

const mysql=require("mysql2")
app.use(bodyparser.urlencoded({extended:true})) //apply urlencode middleware to parse request body //middlewears are special functions to process requst/request header before hit links in express

app.get("/",(request,response)=>
{
   response.sendFile(path.join(__dirname,"register.html")) 
})
app.get("/login",(request,response)=>
{
   response.sendFile(path.join(__dirname,"login.html")) 
})
app.post("/saveRegister",(req,res)=>
{
    const formData=req.body

    const name=formData.name
    const age=formData.age
    const mobile=formData.mobile
    const email=formData.email
    const password=formData.password

    const con=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"Sukhada30",
        database:"persondb"
    })

    con.connect((err)=>
    {  
        try{
        if(err)
        {
            console.log(err)
            throw err
        }
        const sql=`insert into person(name,age,mobile,email,password) values 
        ('${name}','${age}','${mobile}','${email}','${password}')`

        con.query(sql,(err,result)=>
        {
            if(err)
            {
                console.log(err)
                throw err
            }
            console.log("Register sucessfull....")
        });
        con.commit()
    }
        catch(err)
        {
            console.log(err)
        }
    })

    res.sendFile(path.join(__dirname, "login.html"))

})
app.post("/checkLogin", (request, response) => {
    const loginData = request.body

    const email = loginData.email
    const password = loginData.password

    response.send("<h1>Login Successful....</h1>")
})
const port = 3000
const host = "127.0.0.1"
app.listen(port, host, () => {
    console.log(`Server sarted on http://${host}:${port}`)
})