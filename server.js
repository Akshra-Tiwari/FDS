const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");

const ocrRoutes =
  require("./routes/ocrRoutes");

const userRoutes =
  require("./routes/userRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const receiptRoutes =
  require("./routes/receiptRoutes");

dotenv.config();

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/receipt",
  receiptRoutes
);

app.use(
  "/api/ocr",
  ocrRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/transactions",
  require("./routes/transactionRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);


// SERVER
const server =
  http.createServer(app);


const io =
  new Server(server, {

    cors: {

      origin: "*",

      methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE"
      ]

    }

  });


module.exports.io = io;


// DATABASE
mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

  server.listen(
    process.env.PORT || 5000,
    () => {

      console.log(
        `Server running on port ${
          process.env.PORT || 5000
        }`
      );

    }
  );

})

.catch((err) => {

  console.log(err);

});