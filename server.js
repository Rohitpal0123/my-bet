const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

require("dotenv").config();

//connect to database
connectDB();

//Initialize Express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Define Routes
const betRouter = require("./routes/bet");
const projectRouter = require("./routes/project");
const userRouter = require("./routes/user");
const auctionerRouter = require("./routes/auctioner");
const roleRouter = require("./routes/role");

app.use("/bet", betRouter);
app.use("/project", projectRouter);
app.use("/user", userRouter);
app.use("/auctioner", auctionerRouter);
app.use("/role", roleRouter);

app.use("/", (req, res) => {
  console.log("Welcome to My Bet ");
});

//Create PORT and host express server on the same
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
