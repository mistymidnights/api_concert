const express = require("express");
const cors = require('cors');
const UserRoutes = require('./api/user/user.routes');

const { connectDb } = require('./helpers/db');

const PORT = process.env.PORT || 8000;
connectDb();


const app = express();

// Cors enable
app.use(cors({ 
    origin: (_origin, callback) => {
        callback(null, true);
    },

        credentials: true 
    
    }));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Json Data
app.use(express.json({ limit: '1mb' }))
// urlEncoded
app.use(express.urlencoded({ limit: '1mb', extended: true }));
// Routes

app.use('/api/v1/user', UserRoutes);

// Error handler
app.use((error, _req, res, _next) => {
    return  res
    .status(error.status || 500)
    .json(error.message || 'Unexpected error');
});


app.use('*', (_req, _res, next) => {
    const error = new Error()
    error.status = 404
    error.message = 'Route not found'
    return next(error)
})


// Enable Language
app.disable('x-powered-by')
// Open Listener Server

app.listen(PORT, () => {
    console.log('Server on air');
})