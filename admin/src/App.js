import { useState, useEffect } from "react";
import axios from "axios";

import { Button, Loader, Input } from "rsuite";

import "rsuite/dist/rsuite.min.css";

function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newProduct, setNewProduct] = useState({
    nom: null,
    poids: null,
    image: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then(async (response) => {
        await wait(1);
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:3001/products/${productId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createProduct = () => {
    axios
      .post(`http://localhost:3001/products`, {
        nom: newProduct.nom,
        poids: parseInt(newProduct.poids),
        image: newProduct.image,
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return (
      <div
        style={{
          border: "4px solid black",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size="md" />
      </div>
    );
  }

  return (
    <div>
      <div>{JSON.stringify(newProduct)}</div>

      <Input
        placeholder="Nom"
        onChange={(value) => {
          setNewProduct({
            ...newProduct,
            nom: value,
          });
        }}
      />
      <Input
        placeholder="Poids"
        onChange={(value) => {
          setNewProduct({
            ...newProduct,
            poids: value,
          });
        }}
      />
      <Input
        placeholder="Image"
        onChange={(value) => {
          setNewProduct({
            ...newProduct,
            image: value,
          });
        }}
      />

      <Button
        appearance="primary"
        onClick={() => {
          createProduct();
        }}
      >
        Ajouter
      </Button>

      {products.map((pot, index) => {
        const poidFinal = pot.poids / 1000;

        return (
          <div
            key={index}
            style={{
              fontSize: 20,
              borderWidth: "1px",
              width: 300,
              height: 200,
              marginBottom: 20,
              display: "flex",
              flexDirection: "row",
              border: "1px solid black",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div>
              <img
                width={40}
                height={40}
                src={pot.image}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ height: "50%" }}>
                <a
                  style={{
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                  href={`http://localhost:3001/products/${pot.id}`}
                >
                  {pot.nom}
                </a>
                <div>{poidFinal}kg</div>
                <div> ID: {pot.id}</div>
              </div>
              <div
                style={{
                  height: "50%",
                  width: "100%",
                }}
              >
                <button onClick={() => deleteProduct(pot.id)}>supprimer</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
