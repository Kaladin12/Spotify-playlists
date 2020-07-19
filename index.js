var request = require("request");
var fs = require("fs");
var token = "Bearer BQBz-nWo6SedTsvy60xOZezfW3ZTaMFFKIN8R7G-Tlc4C2x60STcOkOiF-iDex2iVZ7LQtH2w2J99ZO3DLRbQsTHsUaEAC7AIpDRODeJWnM9cAzlAIzsz7gtKa9qYKFqwjVYOQPT0Nmgd78r"
//var token = "Bearer BQCFyzdAZrM5YLZHqKxuVExp1oES8B731FPrVJqVVJVrLxH9YLvecdjiSA4mm7891pttSryfHVkAZI7ZSphd36ntqpAEEuCV9nRkZIjVCY_5vPdMTA-i5bV_DmGIDi3Q0kzWr9jbhcEdz-uH"
var userID = 'eliancruz998';
var playlistsURL = "https://api.spotify.com/v1/users/"+userID+"/playlists";
//var playlistsURL = "https://api.spotify.com/v1/"+userID+"/playlists";
let i = 79;
let name = '';
var songs = [];

request({url:playlistsURL, headers: {
    "Authorization": token}},
    function(arr, res){
        if (res){
            let playlists = JSON.parse(res.body);
            playlists.items.forEach(function(playlist){
                if (playlist.owner.id!=userID){
                    //console.log(playlist.name);
                    let playlistURL = playlist.href
            request({url:playlistURL, headers : {
                "Authorization":token}},
                function(arr, res){
                    if (res){
                        var playlist = JSON.parse(res.body);
                        let playlistList = [{'name':playlist.name, songs:[]}]
                        name = playlist.name;
                        console.log("playlist: "+ playlist.name);
                        playlist.tracks.items.forEach(function(track){
                            //console.log(track.track.artists[0].name);
                            playlistList[0].songs.push({
                                'artist':track.track.artists[0].name,
                                'name':track.track.name,
                                'album':track.track.album.name
                            })
                        });
                        //console.log(playlistList[0].songs);
                        fs.writeFile("./"+i+".json", JSON.stringify(playlistList, null, 4), (err)=>{
                            if (err){
                                console.error(err);
                                return;
                            };
                            console.log('creado correctamente');
                        })
                        i+=1;
                        //var obj = JSON.parse(fs.readFileSync('./1.json'));
                        //console.log('obj',obj);
                    }
                })
                }
                else{
                    console.log('Mia: ',playlist.name)
                }
            });
        }
    })