const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/user-mgmt-fe'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/user-mgmt-fe/index.html'));
});
ngApp.listen(process.env.PORT || 8080);
