const express = require("express");

const { connectDb } = require('./helpers/db');

const PORT = process.env.PORT || 8000;
connectDb();

const app = express();

app.listen(PORT, () => {
    console.log('Server on air');
})