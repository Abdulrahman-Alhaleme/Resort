import express from "express";
import pkg from "pg";
const { Pool } = pkg;
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Ipopyou9$",
  port: 5432,
});
//resort
app.get("/", (req, res) => {
  res.json("hello this is the backend");
});
app.get("/resortcard", (req, res) => {
  const q = "SELECT * FROM resort";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/resortcard", (req, res) => {
  const q = "INSERT INTO resort (title,desc,price,cover) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("resort has been created successfully");
  });
});

app.delete("/resortcard/:id", (req, res) => {
  const resortid = req.params.id;
  const q = "DELETE FROM resort WHERE id = ?";
  db.query(q, [resortid], (err, data) => {
    if (err) return res.json(err);
    return res.json("resort has been deleted successfully");
  });
});

app.put("/resortcard/:id", (req, res) => {
  const resortid = req.params.id;
  const q =
    "UPDATE resort SET title=?, desc=? , price=? , cover=? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, resortid], (err, data) => {
    if (err) return res.json(err);
    return res.json("resort has been updated successfully");
  });
});

//payment
app.post("/payment", async (req, res) => {
  console.log(req.body);
  try {
    // const cardnumber = req.body.cardnumber;
    const expirationdate = req.body.expirationdate;
    const cvv = req.body.cvv;

    const cardholder = req.body.cardholder;
    // const hashedCardNumber = bcrypt.hashSync(cardnumber, 10);

    const newPayment = await pool.query(
      "INSERT INTO payment ( expirationdate,cvv, cardholder) VALUES($1, $2, $3) RETURNING *",
      [expirationdate, cvv, cardholder]
    );

    res.json(newPayment.rows);
  } catch (err) {
    console.log(err.message);
  }
});
//Get all Resorts
app.get("/resorts", async (req, res) => {
  try {
    const query = "SELECT * FROM resort";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific resort by ID
app.get("/resorts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM resort WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Resort not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update resort availability after booking
app.put("/payment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "UPDATE resort SET availability = false WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Resort not found" });
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const port = 5001;

app.listen(port, () => {
  console.log("server work on port 5001");
});
