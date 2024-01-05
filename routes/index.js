var express = require('express');
const ytdl = require('ytdl-core');
var router = express.Router();
const NotionUtils = require('../helpers/notion')

/* GET Index page. */
router.get('/', async (req, res) => {
    res.render('index', {error: []})
});

router.get('/download', async (req, res) => {
    let extensionDownload = 'mp3';
    let videoUrl = req.query.url;
    let videoTitle = '';
    try{
        const info = await ytdl.getInfo(videoUrl);
        videoTitle = info.videoDetails.title;
        const stream = ytdl(videoUrl, { quality: 'highestaudio' });
        
        res.setHeader('Content-Disposition', 'attachment; filename="'+videoTitle+'.' + extensionDownload +'"');
        res.setHeader('Content-Type', 'audio/mpeg');

        stream.pipe(res);
        NotionUtils.createLog(videoTitle, videoUrl, false, '');
    }catch(error){
        console.log(error);
        res.render('index', {error: [error.toString()]})
        NotionUtils.createLog(videoTitle, videoUrl, true, error.toString());
    }
    
    
})

module.exports = router;