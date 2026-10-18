import cors from "cors"
import express from "express"

const app=express();

app.use(cors());
app.use(express.json());

const port=7000

let students = [
    { id: 1, name: "Abhishek", branch: "CSE" },
    { id: 2, name: "Rahul", branch: "IT" }
];



app.get("/user" ,(req,res)=>{
    res.status(200).json({
        message:"Welcome to server",
        students
    })
})

app.get("/user/:id",(req,res)=>{
    try{
        const id=parseInt(req.params.id);
        const idx=students.find((u)=>u.id==id);

        if(!idx){
            return res.status(200).json({
                message:"use not found"
            })
        }

        res.status(200).json({
            message:"Use  found",
            user:idx,
        })

    }catch(error){
        console.log(`Error occur ${error}`);

        res.status(400).json({
            message:"Error"
        })
    }
})

app.post("/create" ,(req,res)=>{

    try{
        const {id,name,branch}=req.body;

        if(!id || !name || !branch){
            return res.status(400).json({
                message:"Please enter all details"
            })
        }

        const duplicateId=students.find((u)=>u.id===id);

        if(!duplicateId){
            return res.status(400).json({

                message: "ID already exists"

            });
        }

        

        const newStudent={
            id,
            name,
            branch,
        }

        students.push(newStudent);

        res.status(201).json({
            message:"Request completed",
            updateUSer:students
        })
    }
    catch(error){
        console.log(`Error occur ${error}`)

        res.status(500).json({
            message:"Request not create",
        })
    }
})

app.put("/user/:id",(req,res)=>{
    try{

        const {name,branch}=req.body;
        const id=parseInt(req.params.id);

        if(!branch || !name){
            return res.status(400).json({
                message:"Filled all details "
            })
        }

        const idx=students.findIndex((u)=>u.id==id);

        if(idx=== -1){
            return res.status(400).json({
                message:"use not found"
            })
        }

        students[idx]={
            id,name,branch
        }

        res.status(202).json({
            message:"Request completed",
            updateUSer:students
        })
        
    }catch(error){
        console.log(`Error occur ${error}`);

        res.status(400).json({
            message:"Error"
        })
    }
})

app.delete("/:id" ,(req,res)=>{
    try {
        const id=parseInt(req.params.id);

        const idx=students.findIndex((u)=>u.id===id);

        if(idx=== -1){
            return res.status(400).json({
                message:"use not found"
            })
        }

        students.splice(idx,1);

        res.status(202).json({
            message:"Request deleted",
            updateUSer:students
        })
    } 
    catch (error) {
        console.log(`Error occur ${error}`);

        res.status(400).json({
            message:"Error"
        })
    }
})
app.get("/user",(req,res)=>{
    try{
        const{branch}=req.query;
        let result=[...students];
        console.log(result);
        if(branch){
            result=result.filter((student)=>student.branch.toLowerCase()===branch.toLowerCase());
        }
        
        console.log(result);
        res.status(200).json({
        count: result.length,
        students: result
    });
    }catch(error){
        console.log(`Error occur ${error}`);

        res.status(400).json({
            message:"Error"
        })
    }
})
app.options("/user", (req, res) => {
    res.set("Allow", "GET, HEAD, POST, OPTIONS");
    return res.status(204).end();
});
app.listen(port,()=>{
    console.log(
        `Server running on http://localhost:${port}`
    );
})
