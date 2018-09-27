const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const petRouter = require('./routes/pets.router');
const ownerRouter = require('./routes/owners.router');
const homeRouter = require('./routes/home.router');


app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/pets', petRouter);
app.use('/owners', ownerRouter);



app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
  });