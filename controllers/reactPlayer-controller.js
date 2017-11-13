const axios = require ("axios");
const reactPlayerController = {};
var userhome = require('userhome')
var dir = require('node-dir');
const fs = require('fs');
require('dotenv').config();


// var reactPlayerLocation= path.resolve(userhome(),'Music/reactPlayer')
// console.log(reactPlayerLocation); 

//**** */

var PlayMusic = require('playmusic');

var pm = new PlayMusic();

reactPlayerController.song= (req,res)=>{
  pm.init({email: process.env.email, password: process.env.password}, function(err) {
        pm.getStreamUrl(req.body.storeId, function(err, streamUrl) {
            if(err) console.error(err);
            console.log("09090");
            res.status(200).json({data: streamUrl});
        });
  })
};


reactPlayerController.search= (req,res)=>{
  console.log(req.body.song, "SEARCHING");
  pm.init({email: process.env.email, password: process.env.password}, function(err) {
    if(err) return console.log("error", err);
    pm.getLibrary(function(err, library) {
        if(err) console.error(err);
      
        pm.search(req.body.song, 10, function(err, data) { // max 10 results
        var songX = data.entries
        var songXS = songX.filter(function(data){
          return data.type=='1' ;
        });

        var songData=[];
        songXS.map(function(data){
        songData.push({ title:data.track.title,
                        artist:data.track.artist, 
                        cover: data.track.albumArtRef, 
                        storeId: data.track.storeId
                      });
        })

        console.log(songData);

        pm.getStreamUrl(songXS[1].track.storeId, function(err, streamUrl) {
            if(err) console.error(err);
            // console.log(streamUrl);
            console.log(songXS[0].track.albumArtRef[0].url);
            // res.status(200).json({data: {music:streamUrl, img:songXS[0].track.albumArtRef[0].url}});
            res.status(200).json({data: {music:streamUrl, img:songXS[0].track.albumArtRef[0].url, songs:songData}});
        });
    }, function(message, body, err, httpResponse) {
        console.log(message);
    });
    });
});
};


//**** */

var reactPlayer= '/Users/franklinl/Music/reactPlayer';

reactPlayerController.songs= (req,res)=>{
    console.log(dir.readFileSync)
    console.log(dir.readFilesStream)
    console.log (dir.files)

var songsPaths = dir.files(reactPlayer, {sync:true});
console.log("cgfhvbjnm" +songsPaths);

var data=[]; 
    
let trim= function(title){
return title.substring(0, title.length-4);

}


fs.readdir(reactPlayer, (err, files) => {
  files.forEach(file => {
    var sFileExtension = file.split('.')[file.split('.').length - 1];
    console.log (sFileExtension);
    console.log("title "+trim(file));
    if (sFileExtension=="mp4"){
         data.push({
        name:trim(file),
        path:reactPlayer+file 
    });
    }
    //console.log (reactPlayer+file );
   

 
  });

  res.json({
        data: data,
  
      });
})


}






//
//





module.exports = reactPlayerController;