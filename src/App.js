import MakeTable from "./components/MakeTable";
import "./App.css";
import DataStats from "./components/DataStats";


const App = () => {
  return (
    <div className="App">
      <DataStats />
      <MakeTable />
    </div>
  );
}

export default App;