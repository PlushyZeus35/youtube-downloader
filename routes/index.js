var express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');
var router = express.Router();

/* GET Index page. */
router.get('/', async (req, res) => {
    res.render('index', {error: []})
});

router.get('/download', async (req, res) => {
    var videoUrl = req.query.url; 
    try{
        const videoInfo = await ytdl.getBasicInfo(videoUrl);
        let videoId = videoUrl.split('=')[1].split('&')[0];
        let videoTitle = await ytdl.getInfo(videoId);
        videoTitle = videoTitle.videoDetails.title + '.mp3';
        videoTitle = videoTitle.replace(/[^\w.,\s]/g, '');
        var videoReadableStream = ytdl(videoUrl, { filter: 'audioonly'}); 
        res.header("Content-Disposition", 'attachment;\  filename="' + videoTitle+"\"");
        var stream = videoReadableStream.pipe(res);
    }catch(error){
        res.render('index', {error: [error.toString()]})
    }
    
    
})



module.exports = router;