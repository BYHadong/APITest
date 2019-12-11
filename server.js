const express = require('express');
const vhost = require('vhost');
const serverApp = require('./server/app');
const app = express();
const PORT = 80;
const url = "apitest.com";
//subDomain
app.use(vhost(url, serverApp));

app.listen(PORT, () => {
    console.log(`Server running at : http://${url}:${PORT}`);
    console.log(`Server running at : http://${url}`);
});