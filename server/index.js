const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

const PRODUCTS = [
  {
    id: "1",
    nom: "POT1",
    poids: 1000,
    image:
      "https://thumbs.dreamstime.com/b/pot-de-miel-avec-le-nid-d-abeilles-37965273.jpg",
  },
  {
    id: "2",
    nom: "POT2",
    poids: 500,
    image:
      "https://thumbs.dreamstime.com/b/pot-de-miel-avec-le-nid-d-abeilles-37965273.jpg",
  },
  {
    id: "3",
    nom: "POT3",
    poids: 2000,
    image:
      "https://thumbs.dreamstime.com/b/pot-de-miel-avec-le-nid-d-abeilles-37965273.jpg",
  },
  {
    id: "4",
    nom: "POT4",
    poids: 1000,
    image:
      "https://thumbs.dreamstime.com/b/pot-de-miel-avec-le-nid-d-abeilles-37965273.jpg",
  },
];

// list all products
app.get("/products", (req, res) => {
  res.send(PRODUCTS);
});

// list one product
app.get("/products/:productId", (req, res) => {
  const { productId } = req.params;

  const element = PRODUCTS.find((product) => product.id === productId);

  if (element) {
    res.send(element);
  } else {
    res.send({ error: true });
  }
});

// create one product
app.post("/products", (req, res) => {
  const { poids, nom } = req.body;

  if (!poids || !nom) {
    return res.send({ error: "params_missing" });
  }

  PRODUCTS.push({
    id: (PRODUCTS.length + 1).toString(),
    nom: nom,
    poids: poids,
  });

  res.send(PRODUCTS);
});

// delete one product
app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;

  PRODUCTS.splice(parseInt(productId) - 1, 1);

  return res.send(PRODUCTS);
});

// todo : update one product
app.put("/products/:productId", (req, res) => {
  const { nom, poids } = req.body;

  return res.send("");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
