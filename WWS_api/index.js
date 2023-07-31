const express = require('express');
const db = require('./db');
const cors = require("cors");
const router = require('./router');
const app = express();
const PORT = 7000;


app.use(cors({
    origin: 'https://we-will-see-ticket-request-full-stack.vercel.app/',
}));

app.use(express.json());
app.use(router);

app.get('/health', (req, res) => {
    return res.send('healthy');
});

db.then(() =>
    {
        app.listen(PORT, () => {
            console.log('Server is running on port: ' + PORT);
        })
    }
).catch((error) => {
    console.error('Error starting server', error.message);
})