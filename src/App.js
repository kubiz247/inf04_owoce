import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Fruits from "./Fruits";

function App() {
    return (
    <div className="App">
        <div className="container my-4">
            <h2>Katalog owoców</h2>
            <Fruits />
        </div>
    </div>
  );
}

export default App;
