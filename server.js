require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, './frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './frontend/build/index.html'));
    });
}

app.listen(port, (err) =>  {
    if (err) return console.log(err);
    console.log(`Server running on port: ${port}`);
})