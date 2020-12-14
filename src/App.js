import "./App.css";
import Makes from "./components/molecules/Makes";
import Models from "./components/molecules/Models";
import Vehicles from "./components/molecules/Vehicles";
import { useState } from "react";

function App() {
    let [screen, setScreen] = useState(1);
    let [make, setMake] = useState("");
    let [model, setModel] = useState("");

    return (
        <div className="App">
            {screen === 1 && (
                <Makes
                    handleSetMake={(make) => {
                        setMake(make);
                        setScreen(screen + 1);
                    }}
                />
            )}
            {screen === 2 && (
                <Models
                    back={() => setScreen(screen - 1)}
                    handleSetModel={(model) => {
                        setModel(model);
                        setScreen(screen + 1);
                    }}
                    make={make}
                />
            )}
            {screen === 3 && (
                <Vehicles
                    back={() => setScreen(screen - 1)}
                    make={make}
                    model={model}
                />
            )}
        </div>
    );
}

export default App;
