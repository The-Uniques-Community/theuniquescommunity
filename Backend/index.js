const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbconnect = require("./config/dbConfig");
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: true,
    credentials: true,
  }
));



app.get('/', (req, res) => {
	res.send('hello its working');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

dbconnect();
