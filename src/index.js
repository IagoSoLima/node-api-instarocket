const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://root:root@cluster0-a6urs.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

//real time
app.use((req,res,next) =>  {
    req.io = io;
    next();
});

app.use(cors());

//configuração de rotas para visualizar imagens
app.use('/files', express.static(path.resolve(__dirname, '..','uploads','resized')));

app.use(require('./routes'));

// server.listen(3333);
server.listen(process.env.PORT || 3333);
