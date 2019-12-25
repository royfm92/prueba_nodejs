const { Router } = require('express');
const router = Router();

const mysqlConnection = require('../database');

router.post('/auth/register', (req, res) => {
    const {nombre, email, password} = req.body;
    mysqlConnection.query('INSERT INTO user (nombre, email, password) VALUES (?,?,?);', [nombre, email, password], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'User Saved'});
        } else {
            console.log(err);
        }
    });
});

router.post('/books', (req, res) => {
    const {isbn, titulo, autor, fecha, id_user} = req.body;
    mysqlConnection.query('INSERT INTO book (isbn, titulo, autor, fecha, id_user) VALUES (?,?,?,?,?);', [isbn, titulo, autor, fecha, id_user], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'Book Saved'});
        } else {
            console.log(err);
        }
    });
});

router.get('/books', (req, res) => {
    mysqlConnection.query('SELECT * FROM book', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/books/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM book WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.put('/books/:id', (req, res) => {
    const {isbn, titulo, autor, fecha, id_user} = req.body;
    const { id } = req.params;
    mysqlConnection.query('UPDATE book SET isbn = ?, titulo = ?, autor = ?, fecha = ?, id_user = ? WHERE id = ?', [isbn, titulo, autor, fecha, id_user, id], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'Book Updated'});
        } else {
            console.log(err);
        }
    });
  });

router.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM book WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'Book Deleted'});
        } else {
            console.log(err);
        }
    });
  });

module.exports = router;