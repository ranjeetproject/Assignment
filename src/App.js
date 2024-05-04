import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddForm from "./components/form/addForm";
import List from "./components/list.js/list";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer autoClose={1500} />
        <Routes>
          <Route path="/" element={<AddForm />} />
          <Route path="list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
