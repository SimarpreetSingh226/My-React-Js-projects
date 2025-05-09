import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  // color: "red", fontSize: "32px", textTransform: "uppercase"
  const style = {};
  return (
    <header className="header footer">
      <h1 style={style}>Fast React pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numpizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numpizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine 6 creative dishes to choose from. All from
            our own stone oven, all organic, all authentiic
          </p>

          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>we're still working on our menu. Please come back later</p>
      )}

      {/* <Pizza
        name="Puizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato,mushroom"
        price={12}
        photoName="pizzas/funghi.jpg"
      /> */}
      {/* <Pizza />
      <Pizza /> */}
    </main>
  );
}
// function Pizza(props) {
//to avoid props use destructuring in which pizzaObj is directly called
function Pizza({ pizzaObj }) {
  //component calling uupar
  // console.log(props);
  console.log(pizzaObj);

  // if (pizzaObj.soldOut) return null;

  return (
    <li className={`pizza ${pizzaObj.soldOut ? "Sold-out" : ""}`}>
      {/* <li className="pizza sold-out"> */}
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      {/* <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} /> */}
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>

        {/* {pizzaObj.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{pizzaObj.price}</span>
        )} */}

        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
        {/* <img src="pizzas/spinaci.jpg" alt="Pizza Spinaci" />
      <h3>Pizza Spinaci</h3>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p> */}
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // if (hour >= openHour && hour <= closeHour) {
  //   alert("we're currently open");
  // } else {
  //   alert("Soryy we're closed");
  // }
  //1st method to rendor && 2nd ? : 3d if(jsx)

  return (
    <footer className="footer">
      {/* {new Date().toLocaleDateString()}.we're currently open */}
      {isOpen ? (
        // <Order closeHours={closeHour} />
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        // <div className="order">
        //   <p>we're open until {closeHour}:00. Come visit us or order online.</p>
        //   <button className="btn">Order</button>
        // </div>
        <p>
          We're happy to welcome you between (openHour):00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
  // return React.createElement("footer", null, "We're currently open");
}
// function Order(props) {
function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        {/* we're open until {props.closeHours}:00. Come visit us or order online. */}
        we're open from {openHour}:00 until {closeHour}:00. Come visit us or
        order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// const root = ReactDom.createRoot(document.getElementById("root"));
// root.render(<App />);

//strict mode
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
