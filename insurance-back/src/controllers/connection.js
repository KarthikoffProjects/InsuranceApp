const express = require('express');
const cors = require('cors');
const session = require('express-session');
const sql = require('mysql2');
const app = express();
const logger = require('./logger');

app.use(cors({
  origin: "http://localhost:3001", // Adjust if frontend runs on a different port
  credentials: true
}));
app.use(express.json());
//Session Configuration
app.use(session({
  secret: 'your_secret_key',  
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true } // Change secure to true if using HTTPS
}));

//MySQL Connection
const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "insur"
});

connection.connect((err) => {
  if (err) {
    logger.connectionlogger.error("Error connecting", err);
  } else {
    logger.connectionlogger.info("Connected to MySQL");
  }
});

//Login Route
app.post('/login', (req, res) => {
  const { Name, Password } = req.body;
  const sql = "SELECT * FROM loginusers WHERE Name = ? AND Password = ?";
  
  connection.query(sql, [Name, Password], (err, results) => {
    if (err) {
      logger.connectionlogger.error("Login error", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    
    if (results.length > 0) {
      req.session.user = { Name: results[0].Name };  // ✅ Store user session
      return res.json({ message: "Login successful", user: req.session.user });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie('connect.sid');  // 🔥 Important: Remove session cookie
    res.json({ message: "Logout successful" });
  });
});

app.get('/session', (req, res) => {
  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user });
  } else {
    return res.json({ loggedIn: false });
  }
});

// Protected Route Example
// app.get('/dashboard', (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   res.json({ message: "Welcome to your dashboard", user: req.session.user });
// });
// check for ui for password 8 characters
app.post('/loginusers', (req, res) => {
  const sql = "INSERT INTO loginusers (Name, Password, Age) VALUES (?, ?, ?)";
  const values = [req.body.Name, req.body.Password, req.body.Age];

  logger.connectionlogger.info("Inserting user:", values);

  connection.query(sql, values, (err, data) => {
    if (err) {
      logger.connectionlogger.error("Error inserting user", err);
      return res.status(500).json(err);
    }
    logger.connectionlogger.info("User inserted successfully");
    return res.json({ message: "Insert successful", inserted: data });
  });
});


// Insurance Data Fetching (No Login Required)
app.get('/TravelInsurance', (req, res) => {
  const sql = "SELECT * FROM TravelInsurance";
  connection.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get('/MotorInsurance', (req, res) => {
  const sql = "SELECT * FROM MotorInsurance";
  connection.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get('/LifeInsurance', (req, res) => {
  const sql = "SELECT * FROM LifeInsurance";
  connection.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});
app.post('/mock-payment', (req, res) => {
  const { amount, currency } = req.body;
  
  // Simulate a delay to mimic real payment processing
  setTimeout(() => {
    res.json({ success: true, message: "Payment successful (dummy)", amount, currency });
  }, 2000);
});
app.listen(3000, () => {
  logger.connectionlogger.info("🚀 Server is running on http://localhost:3000");
});
