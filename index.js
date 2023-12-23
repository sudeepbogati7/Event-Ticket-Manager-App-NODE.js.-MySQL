const express = require("express");
const app = express();
app.use(express.json());

const sequelize = require('./config/connection');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = 3000 || process.env.PORT;

// models :
require("./models/event")(sequelize);
require("./models/ticket")(sequelize);
require("./models/organizer")(sequelize);
require('./models/user')(sequelize);



require('./models/associations')(sequelize); // model associations 
require('./startup/routes')(app); // routes


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
  });
});