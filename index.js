const express = require("express");
const app = express();

const sequelize = require('./config/connection');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());


// models :
require("./models/event")(sequelize);
require("./models/ticket")(sequelize);
require("./models/organizer")(sequelize);
require('./models/user')(sequelize);

require('./models/associations')(sequelize); // model associations 
require('./startup/routes')(app); // routes


