import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import axios from "axios";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let [{ data: items }, { data: categories }] = await Promise.all([
          axios.get("http://localhost:3000/items"),
          axios.get("http://localhost:3000/categories"),
        ]);
        setItems(items);
        setCategories([{ name: "ALL", id: 0 }, ...categories]);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const itemsNumber = items.reduce((acc, item) => item.count + acc, 0);
  const cartItems = items.filter((item) => item.count);

  function handleIncrement(id) {
    let newItems = items.map((item) => ({
      ...item,
      count: item.id == id ? item.count + 1 : item.count,
    }));
    setItems(newItems);
  }

  function handleDecrement(id) {
    let newItems = items.map((item) => ({
      ...item,
      count: item.id == id && item.count > 1 ? item.count - 1 : item.count,
    }));
    setItems(newItems);
  }

  function handleClear() {
    let newItems = items.map((item) => ({
      ...item,
      count: 0,
    }));
    setItems(newItems);
  }

  function addToCart(id) {
    let newItems = items.map((item) => ({
      ...item,
      count: item.id == id ? +!item.count : item.count,
    }));
    setItems(newItems);
  }

  function addItem(item) {
    setItems([...items, item]);
  }

  function updateItem(newItem) {
    let newItems = items.map((item) =>
      item.id == newItem.id ? { ...item, ...newItem } : item
    );
    setItems(newItems);
  }

  function deleteItem(id) {
    let newItems = items.filter((item) => item.id != id);
    setItems(newItems);
  }

  return (
    <div className="flex flex-col  min-h-screen">
      <Navbar itemsNumber={itemsNumber} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={
            <Menu
              categories={categories}
              items={items}
              addToCart={addToCart}
              isLoading={loading}
            />
          }
        />
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/cart"
          element={
            <Cart
              items={cartItems}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleDelete={addToCart}
              handleClear={handleClear}
              itemsNumber={itemsNumber}
              isLoading={loading}
            />
          }
        />
        <Route path="/admin">
          <Route
            index
            element={
              <Admin
                items={items}
                categories={categories}
                deleteItem={deleteItem}
              />
            }
          />
          <Route
            path="new-product"
            element={<NewProduct categories={categories} addItem={addItem} />}
          />
          <Route
            path="edit-Product"
            element={
              <EditProduct categories={categories} updateItem={updateItem} />
            }
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
