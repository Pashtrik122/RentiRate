const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const { error } = require('console')

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5002;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "HappyLama1",
    database: "rentirate"
})

app.post('/add_user', (req, res) => {
    const { name, surname, email, age, gender } = req.body;

    const sqlCheckExistence = "SELECT COUNT(*) AS count FROM sellers WHERE name = ? AND surname = ? AND email = ?";
    const values = [name, surname, email];

    db.query(sqlCheckExistence, values, (err, result) => {
        if (err) return res.json({ message: 'Error checking seller existence: ' + err });

        const sellerCount = result[0].count;

        if (sellerCount > 0) {
            return res.json({ error: 'Seller already exists!' });
        } else {
            const sqlInsert = "INSERT INTO sellers (name, surname, email, age, gender) VALUES (?, ?, ?, ?, ?)";
            const insertValues = [name, surname, email, age, gender];

            db.query(sqlInsert, insertValues, (err, result) => {
                if (err) return res.json({ message: 'Error adding seller: ' + err });

                const sqlResetAutoIncrement = "ALTER TABLE sellers AUTO_INCREMENT = 1";
                db.query(sqlResetAutoIncrement, (err, result) => {
                    if (err) return res.json({ message: 'Error resetting ID: ' + err });

                    return res.json({ success: 'User added successfully!', id: result.insertId });
                });
            });
        }
    });
});

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
    sql = "UPDATE sellers SET `name` = ?, `surname` = ? , `email` = ?, `age` = ?, `gender` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.age,
        req.body.gender,
        id
    ]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured' + err})
        return res.json({success: "Seller updated successfully"})
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM sellers WHERE id = ?";
    const sqlSelect = "SELECT * FROM sellers";
    const sqlUpdateIds = "UPDATE sellers SET id = ? WHERE id = ?";
    
    db.query(sqlDelete, [id], (err, result) => {
        if (err) return res.json({ message: 'Error deleting user: ' + err });

        db.query(sqlSelect, (err, rows) => {
            if (err) return res.json({ message: 'Error fetching records: ' + err });

            let newId = 1;
            rows.forEach(row => {
                db.query(sqlUpdateIds, [newId++, row.id], (err, result) => {
                    if (err) console.log('Error updating ID: ' + err);
                });
            });

            return res.json({ success: 'User deleted successfully' });
        });
    });
});


app.listen(port, ()=>{
    console.log('listening')
})