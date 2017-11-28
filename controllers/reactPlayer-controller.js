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




// (songIds, playlistId, callback, entryBeforeClientId, entryAfterClientId) 
reactPlayerController.addToPlaylist=(req,res)=>{
     pm.init({email: process.env.email, password: process.env.password}, (err)=> {
        if(err) console.error(err)
        else console.log("great", req.body.songId);
        pm.addTrackToPlayList(req.body.songId, req.body.playlistID, function(err, mutationStatus){
        console.log(mutationStatus);
    })

     });

}
reactPlayerController.loadPlaylist=(req,res)=>{
        pm.init({email: process.env.email, password: process.env.password}, (err)=> {
        if(err) console.error(err)
        else console.log("great", req.body.playlistId);
    
                pm.getPlayListEntries(function(err, data) {
                            var songData=[];
                            var playList=data.data.items;
                            var index=0;
                            console.log(playList);
                            playList.map((data)=>{
                                    if ( data.track!== undefined && data.playlistId===req.body.playlistId){
                                            
                                            millisToMinutesAndSeconds=(millis)=> {
                                                var minutes = Math.floor(millis / 60000);
                                                var seconds = ((millis % 60000) / 1000).toFixed(0);
                                                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                                            }

                                            console.log(data.track.title, "----------------");
                                            songData.push({ title:data.track.title,
                                                    artist:data.track.artist, 
                                                    cover: data.track.albumArtRef, 
                                                    storeId: data.track.storeId,
                                                    album: data.track.album,
                                                    durationMillis: millisToMinutesAndSeconds(data.track.durationMillis),
                                                    index:index++
                                            });
                                    }
                            })

                        res.status(200).json({data: songData});
                })
        })
        
}

reactPlayerController.getPlayLists=(req,res)=>{
        pm.init({email: process.env.email, password: process.env.password}, (err)=> {
        if(err) console.error(err)
        else console.log("great");
        pm.getPlayLists(function(err, data) {
                if(err) console.error(err);
                var playlistData=[];
                for (var i=0; i<data.data.items.length;i++){
                        // console.log(data.data.items[i]);
                        playlistData.push({
                            name: data.data.items[i].name,
                            id:data.data.items[i].id
                        });
                        console.log(data.data.items[i].id,"id");
                        console.log(data.data.items[i].name,"name");
                };

                 res.status(200).json({data: playlistData});
        })
    })
}


reactPlayerController.song= (req,res)=>{
  pm.init({email: process.env.email, password: process.env.password}, (err)=> {
        pm.getStreamUrl(req.body.storeId, (err, streamUrl)=> {
            if(err) console.error(err);
            console.log("09090");
            res.status(200).json({data: streamUrl});
        });
  })
};


reactPlayerController.search= (req,res)=>{
  console.log(req.body.song, "SEARCHING");
  pm.init({email: process.env.email, password: process.env.password}, (err)=> {
    if(err) return console.log("error", err);
    pm.getLibrary((err, library)=>{
        if(err) console.error(err);
      
        pm.search(req.body.song, 20, (err, data)=>{ // max 10 results
        var songXS = data.entries.filter((data)=> data.type=='1');

        var songData=[];
        console.log(data,"dataaaa");
        songXS.map((data)=>{
                songData.push({ title:data.track.title,
                                artist:data.track.artist, 
                                cover: data.track.albumArtRef, 
                                storeId: data.track.storeId
                              });
        })

        console.log(songData);

        pm.getStreamUrl(songXS[1].track.storeId, (err, streamUrl)=> {
            if(err) console.error(err);
            // console.log(streamUrl);
            console.log(songXS[0].track.albumArtRef[0].url);
            // res.status(200).json({data: {music:streamUrl, img:songXS[0].track.albumArtRef[0].url}});
            res.status(200).json({data: {music:streamUrl, img:songXS[0].track.albumArtRef[0].url, songs:songData}});
        });

    }, (message, body, err, httpResponse)=> {
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
    
let trim=(title)=>title.substring(0, title.length-4);

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