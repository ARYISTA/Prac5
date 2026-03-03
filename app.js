const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/products", require("./routes/productRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

// Error Handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
