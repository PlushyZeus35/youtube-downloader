var express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');
const readline = require('readline');
const ffmpeg = require('fluent-ffmpeg');
var router = express.Router();

/* GET Index page. */
router.get('/', async (req, res) => {
    res.render('index', {error: []})
});

router.get('/download', async (req, res) => {
    var videoUrl = req.query.url;
    try{
        const info = await ytdl.getInfo(videoUrl);
        const title = info.videoDetails.title;
        const stream = ytdl(videoUrl, { quality: 'highestaudio' });
        
        res.setHeader('Content-Disposition', 'attachment; filename="'+title+'.mp3"');
        res.setHeader('Content-Type', 'audio/mpeg');

        stream.pipe(res);
    }catch(error){
        console.log(error);
        res.render('index', {error: [error.toString()]})
    }
    
    
})

module.exports = router;