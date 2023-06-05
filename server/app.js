import express from "express"
import pkg from 'pg'
const { Pool } = pkg;
import cors from "cors"

const app = express();

app.use(express.json())

app.use(cors())

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "12345",
  port: 5432
})

app.get("/", (req, res) => {
  res.json("hello this is the backend")
});
app.get("/resort", (req, res) => {
  const q = "SELECT * FROM resort"
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data.rows)
  })
})

app.post("/resort", (req, res) => {
  const q = "INSERT INTO resort (name,description,price,photo) VALUES ($1,$2,$3,$4)"
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.photo
  ]
  db.query(q, [...values], (err, data) => {
    if (err) return res.json(err)
    return res.json("resort has been created successfully")

  })
})

app.delete("/resort/:id", (req, res) => {
  const resortid = req.params.id;
  const q = "DELETE FROM resort WHERE id = $1"
  db.query(q, [resortid], (err, data) => {
    if (err) return res.json(err)
    return res.json("resort has been deleted successfully")
  })
})

app.put("/resort/:id", (req, res) => {
  const resortid = req.params.id;
  const q = "UPDATE resort SET name=$1, description=$2 , price=$3 , photo=$4 WHERE id = $5";
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.photo
  ]
  db.query(q, [...values, resortid], (err, data) => {
    if (err) return res.json(err)
    return res.json("resort has been updated successfully")
  })
})





//payment
app.post("/payment", async (req, res) => {
  console.log(req.body);
  try {
    // const cardnumber = req.body.cardnumber;
    const expirationdate = req.body.expirationdate;
    const cvv = req.body.cvv;

    const cardholder = req.body.cardholder;
    // const hashedCardNumber = bcrypt.hashSync(cardnumber, 10);

    const newPayment = await db.query(
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
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(201).json({ error: "Internal server error" });
  }
});

// Get a specific resort by ID
app.get("/resorts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM resort WHERE id = $1";
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Resort not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(201).json({ error: "Internal server error" });
  }
});

// Update resort availability after booking
app.put("/payment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "UPDATE resort SET availability = false WHERE id = $1";
    const result = await db.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Resort not found" });
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(201).json({ error: "Internal server error" });
  }
});

// ///////////////////////////////////////start tamara work
app.post('/Signup', (req, res) => {
  const { name, email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  db.query('INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING*', [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err)
    } else {
      console.log(result.rows);
      const variabl0 = db.query("SELECT * FROM users WHERE email = $1", [email]);
      console.log(variabl0)
      res.status(201).send(result.rows)
    }
  }

  )
})

let username;
let useremail;

app.post("/payment", async (req, res) => {
  console.log(req.body);
  try {
    // const cardnumber = req.body.cardnumber;
    const expirationdate = req.body.expirationdate;
    const cvv = req.body.cvv;

    const cardholder = req.body.cardholder;
    // const hashedCardNumber = bcrypt.hashSync(cardnumber, 10);

    const newPayment = await db.query(
      "INSERT INTO payment ( expirationdate,cvv, cardholder) VALUES($1, $2, $3) RETURNING *",
      [expirationdate, cvv, cardholder]
    );

    res.json(newPayment.rows);
  } catch (err) {
    console.log(err.message);
  }
});






// get user data
app.get('/user/:id', async function (req, res) {

  try {
    const { id } = req.params;
    const user = await db.query("SELECT * FROM users WHERE id = $1 ", [id]);
    res.json(user.rows);
  }
  catch (err) {
    console.log(err.message);
  }

});



/////majdi


let generatedUserId
app.post("/recordp", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const all_records = await db.query("SELECT * FROM users");


    let persons0 = all_records.rows;
    persons0.map((e) => {
      if (e.email == email) {
        if (e.password == password) {
          generatedUserId = e.id;
          res.json([e.id, e]);

        }
      }
    });

    //   res.json({email,password});
  } catch (err) {
    console.log(err.message);
  }
});
// Get All Records
app.get("/records", async function (req, res) {
  try {
    const all_records = await db.query(
      "SELECT * FROM users where id = $1  ",
      [generatedUserId]

    );
    console.log(all_records.rows)
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});
// updat
app.put('/Editprofile/:id', async function (req, res) {

  try {
    const { id } = req.params;
    const { name, email } = req.body;
    console.log(id)

    const user = await db.query("UPDATE users SET name = $1,email = $2   WHERE id = $3 ", [name, email, id]);
    res.json(user.rows);
    console.log(email)
  }
  catch (err) {
    console.log(err.message);
  }

});

// ///////////////////////////////////////End tamara work

const port = 5000;

app.listen(port, () => {
  console.log("server work on port 5000")
})
