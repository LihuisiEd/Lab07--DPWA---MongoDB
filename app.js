const mongoose = require('mongoose');
var express = require("express");
const bodyParser = require('body-parser');
var app = express();

app.engine('ejs', require('ejs').renderFile);


app.set('views', './views');

app.use(express.static('public'));

mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
    console.log('Connected to MongoDB');
    }).catch((error) => {
    console.error(error);
});

/*
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User = mongoose.model('User', userSchema);

const newUser = new User({
    name:"Jhon Doe",
    email: 'john@example.com',
    password: '123456'
});

newUser.save().then(() => {
    console.log('New user created!');
}).catch((error) =>{
    console.error('Error creating user:', error);
});

User.find().then((users) => {
    console.log('All users:', users);
}).catch((error) => {
    console.log('Error retrieving users:', error);
});
*/
//-----------------------------------------------
//----Songs-----
const songSchema = new mongoose.Schema({
    name:String,
    category:String,
    singer:String,
    album:String
})
const Song = mongoose.model('Song', songSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/addsong', (req, res) => {
    const newSong = new Song({
        name: req.body.name,
        category: req.body.category,
        singer: req.body.singer,
        album: req.body.album
    });
    newSong.save().then(() => {
        console.log('New song created!');
    }).catch((error) =>{
        console.error('Error creating song:', error);
    });
    Song.find().then((songs) => {
        console.log('All songs:', songs);
    }).catch((error) => {
        console.log('Error retrieving songs:', error);
    });    
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB connected!');
});

//-----Rutas------

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
  
// Manejar la solicitud GET para mostrar los documentos de la colección
app.get('/songs', (req, res) => {
    Song.find().then((songs) => {
        console.log('All songs:', songs);
        res.render('listar-datos.ejs', { songs });
  });
});

app.listen(3000, () => {
    console.log('El servidor está escuchando en http://localhost:3000/');
  });