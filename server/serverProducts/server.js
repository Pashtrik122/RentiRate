const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "HappyLama1",
    database: "rentirate"
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.post('/add_user', (req, res) => {
    const sql = "INSERT INTO products (`image`, `name`, `numeri_tel`, `cmimi`, `lokacioni`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.image,
        req.body.name,
        req.body.numeri_tel,
        req.body.cmimi,
        req.body.lokacioni
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Failed to add product' });
        }
        return res.status(200).json({ message: 'Product added successfully' });
    });
});

app.get("/rentirate", (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        return res.status(200).json(result);
    });
});

app.get("/get_seller/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM products WHERE `id` = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        return res.status(200).json(result);
    });
});

app.post('/edit_user/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE products SET `image` = ?, `name` = ?, `numeri_tel` = ?, `cmimi` = ?, `lokacioni` = ? WHERE id = ?";
    const values = [
        req.body.image,
        req.body.name,
        req.body.numeri_tel,
        req.body.cmimi,
        req.body.lokacioni,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Failed to update product' });
        }
        return res.status(200).json({ message: 'Product updated successfully' });
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    sql = "DELETE FROM products WHERE id = ?";
    const values = [id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Failed to delete product' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    });
});

app.listen(port, () => {
    console.log('Server is listening on port', port);
});
