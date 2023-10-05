import logo from "./logo.svg";
import "./App.css";
import EmployeeList from "./pages/EmployeeList";
import Employees from "./components/Employees";
import { useEffect, useState } from "react";
import { insertDataInIndexedDb } from "./services/indexDB";

function App() {
  // const [db, setDb] = useState(null);

  useEffect(() => {
    insertDataInIndexedDb();
  }, []);

  return (
    <div>
      <Employees />
    </div>
  );
}

export default App;
