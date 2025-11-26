const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./Routes');
require("dotenv").config(); 
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// connect to MongoDB

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// routes
// routes
app.get("/", (req, res) => {
  res.send("Server is running...backend");
});

app.use("/api",apiRouter)

// start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);

});




// piQwhbNvmU8;v6C
// adminuser