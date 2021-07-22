const express = require('express');
const cors = require('cors');
const app = express();

const DIST_DIR = './dist/tulgy-zip';

app.use(function(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }

    next();
});

app.use(express.static(DIST_DIR));

app.use(cors())

app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: `${DIST_DIR}/` });
});

app.listen(process.env.PORT || 8080);