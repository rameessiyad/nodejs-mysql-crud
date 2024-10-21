const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("server running on port " + PORT)
})

