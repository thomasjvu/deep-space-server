const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const logger = require("morgan");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 3005;

const app = express();
const cors = require("cors")


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(errorHandler);

// Use Routes
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

// Homepage for Server
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


// Listen for open ports
app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
    console.log(`Please visit the website at http://localhost:${PORT}`);
});


// Serve Frontend
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client/build")));

//     app.get("*", (req, res) =>
//         res.sendFile(
//             path.resolve(__dirname, "../", "client", "build", "index.html")
//         )
//     )
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'))
// }

