const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5001;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "HappyLama1",
    database: "rentirate"
})

app.post('/add_user', (req, res)=>{
    sql = "INSERT INTO sellers (`name`, `surname`, `email`, `age` ,`gender`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.age,
        req.body.gender
    ]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured' + err})
        return res.json({success: "Seller added successfully"})
    })
})

app.get("/rentirate", (req, res) => {
    const sql = "SELECT * FROM sellers";
    db.query(sql, (err, result) => {
        if(err) res.json({ message: "Server error" });
        return res.json(result);
    })
})

app.get("/get_seller/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM sellers WHERE `id` = ?";
    db.query(sql, [id], (err, result) => {
        if(err) res.json({ message: "Server error" });
        return res.json(result);
    })
})

app.post('/edit_user/:id', (req, res)=>{
    const id = req.params.id;
    sql = "UPDATE sellers SET `name` = ?, `surname` = ?, `email` = ?, `age` = ? ,`gender` = ?, `birthday` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body,age,
        req.body.gender,
        id
    ]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured' + err})
        return res.json({success: "Seller updated successfully"})
    })
})

app.delete('/delete/:id', (req, res)=>{
    const id = req.params.id;
    sql = "DELETE FROM sellers WHERE id = ?";
    const values = [id]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured' + err})
        return res.json({success: "Seller deleted successfully"})
    })
})

app.listen(port, ()=>{
    console.log('listening')
})