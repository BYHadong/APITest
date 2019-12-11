const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
const User = require('./user');

app.use(cors());
app.use(express.json());

//GET
app.get('/', (req, res) => {
    res.send({message: 'Hellow Word'});
});

app.get('/users', User.readAll);

//DELETE
app.delete('/users/drop', (req, res) => {
    res.send({message: 'drop Table'});
    User.drop();
});

app.delete('/users/remove', User.deleteData);

// PUT
app.put('/users/insert', User.insertData);

app.put('/users/create', (req, res) => {
    res.send({message: 'CreatDBTable'});
    User.sync();
});

app.put('/users/update', User.updateData);

app.listen(PORT, () => {
    console.log(`Server running at : http://localhost:${PORT}`);
});

