import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [pots, setPots] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setPots(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:3000/products/${productId}`)
      .then((response) => {
        setPots(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {pots.map((pot, index) => {
        return (
          <div
            key={index}
            style={{
              fontSize: 20,
              borderWidth: "1px",
              width: "33%",
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
