const express = require('express')
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();

require('dotenv').config();
app.use(logger('dev'));

// middlewares
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// static files
app.use(express.static('public'));

//setting up port & listen 
 const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT} 00`);
});


app.get('/', (req, res) => {
  res.send('We are live!');
});

const reactPlayerRouter = require('./routes/reactPlayer-routes');
app.use('/rPlayer', reactPlayerRouter);
/*
app.use('/songs', (req, res) => {
  console.log ("heh hehehehe");
  res.send('hey hey!');
});

app.get('/songs', ()=>{
  console.log ("lololololo")
})
*/
app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found!',
  });
});





/*

const reactPlayerRoutes = require('./routes/reactPlayer-routes');
app.use('/reactPlayer', reactPlayerRoutes);
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);


app.get('/', (req, res) => {
  res.render('reactplayer/home');
});
app.get('/index', (req, res) => {
  res.render('index');
});
/*app.get('/hi', function (req, res) {
  res.send('Hello World!')
});*/

//

//  ms = require('mediaserver');
// app.get('/music.mp3', function(req, res){
//   ms.pipe(req, res, "/music.mp3");
// });

// var http = require('http');
  // ms = require('../index');
 








var reactPlayerLocation= '/Users/franklinl/Music/reactPlayer/One_More_Light.mp4';
var reactPlayer= '/Users/franklinl/Music/reactPlayer/';
//var reactPlayerLocation= '/Users/franklinl/Music/iTunes/iTunes Media/Music/Unknown Artist/Unknown Album/acessGranted.wav';

/*
http.createServer(function (req, res) {

  var _path;
  if(req.url == "/" || req.url == "/index.html"){
    _path = "/index.html";
  } else if (req.url == "/song") {
    _path = reactPlayerLocation;//"/birds.ogg";
  } else {
    res.write("Target Not Found!" );
    res.end();
    return;
  }

  ms.pipe(req, res, path.join(__dirname, _path), path.extname(_path));

}).listen(1337, '127.0.0.1');*/



//
var userhome = require('userhome')
var dir = require('node-dir');
// var reactPlayerLocation= path.resolve(userhome(),'Music/reactPlayer')
// console.log(reactPlayerLocation); 


var songsPaths= dir.files(reactPlayer, function(err, files) {
    if (err) throw err;
    
    //console.log(files);
    return files; 
});

//console.log (songsPaths);

//
var    fileSystem = require('fs');
var http = require('http');
var url = require('url');


http.createServer(function(request, response) {
  var queryData = url.parse(request.url, true).query;
  console.log ("-------------"+ queryData.song);

    // BEGINNING OF NEW STUFF
    response.on('error', (err) => {
      console.error(err);
    });


  console.log ("we've been called");
   // var filePath = reactPlayerLocation;
    var filePath= reactPlayer+ queryData.song+".mp4"; 
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'audio/mp4',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(response);
}).listen(1337, '127.0.0.1');


