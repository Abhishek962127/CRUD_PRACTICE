import cors from "cors"
import express from "express"
import pool from "./db.js";
const app=express();

app.use(cors());
app.use(express.json());

const port=7000

app.get("/user" ,async (req,res)=>{
    try {
        const result=await pool.query(
            "SELECT * FROM students ORDER BY id"
        );
        res.status(200).json({
            message: "Students fetched successfully",
            students: result.rows
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Internal server error"
        });
    }
})

app.get("/user/:userid",async(req,res)=>{
    const id=parseInt(req.params.userid);
    try{
        
       const result=await pool.query(
        "SELECT * from students u where u.id=$1",
        [id]
        
       )
       if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
       res.status(200).json({
            message: "Students fetched successfully",
            students: result.rows
        });

    }catch(error){
        console.log(`Error occur ${error}`);

        res.status(400).json({
            message:"Error"
        })
    }
})

app.post("/create" ,async(req,res)=>{

    try{
        const { name, branch } = req.body;
        if(name===""|| branch===""){
            return res.status(404).json({
                message: "Invalid input"
            });
        }
        const result=await pool.query(
            "INSERT INTO students (name,branch) VALUES ($1,$2) RETURNING *",
            [name,branch]
        )
        res.status(201).json({
            message: "Student created successfully",
            student: result.rows[0]
        });

    }
    catch(error){
        console.log(`Error occur ${error}`)

        res.status(500).json({
            message:"Request not create",
        })
    }
})


app.put("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, branch } = req.body;

        if(name===""|| branch===""){
            return res.status(404).json({
                message: "Invalid input"
            });
        }

        const result = await pool.query(
            "UPDATE students SET name = $1, branch = $2 WHERE id = $3 RETURNING *",
            [name, branch, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student: result.rows[0]
        });

    } catch (error) {
        console.log(`Error occur: ${error.message}`);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


app.delete("/:id" ,async(req,res)=>{
    try {
        const id=parseInt(req.params.id);

        const result=await pool.query(
            "DELETE FROM students WHERE id = $1",
            [id]

        )
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(202).json({
            message:"Request deleted",

        })
    } 
    catch (error) {
        console.log(`Error occur ${error}`);

        res.status(400).json({
            message:"Error"
        })
    }
})

app.get("/user", async (req, res) => {
    try {
        const { search } = req.query;

        const result = await pool.query(
            `SELECT * FROM students
             WHERE name ILIKE $1
             ORDER BY id`,
            [`%${search || ""}%`]
        );
        console.log(search);
        res.status(200).json({
            message: "Students fetched successfully",
            students: result.rows
        });

    } catch (error) {
        console.log(`Error occur: ${error.message}`);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.options("/user", (req, res) => {
    res.set("Allow", "GET, HEAD, POST, OPTIONS");
    return res.status(204).end();
});
app.listen(port,()=>{
    console.log(
        `Server running on http://localhost:${port}`
    );
})
