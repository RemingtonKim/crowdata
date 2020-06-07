const express = require("express");
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const bodyParser = require('body-parser');



app.use(cors());

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }));

const uri = "mongodb+srv://remkim_mongo:4LpUr4Bn3hvy6AK2@crowdata-dzpbu.gcp.mongodb.net/<crowdata_database>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/user.js');
const listingRouter = require('./routes/listing.js');

app.use('/user', userRouter);
app.use('/listing', listingRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));