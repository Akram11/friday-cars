import "./App.css";
import Makes from "./components/Makes";
import Models from "./components/Models";
import Vehicles from "./components/Vehicles";
import { useState } from "react";

function App() {
    let [screen, setScreen] = useState(1);
    let [make, setMake] = useState("");
    let [model, setModel] = useState("");

    const handleSetMake = (make) => {
        setMake(make);
    };

    return (
        <div className="App">
            {screen === 1 && (
                <Makes
                    handleSetMake={(make) => {
                        handleSetMake(make);
                        setScreen(screen + 1);
                    }}
                />
            )}
            {screen === 2 && (
                <Models
                    handleSetModel={(model) => {
                        setModel(model);
                        setScreen(screen + 1);
                    }}
                    make={make}
                />
            )}
            {screen === 3 && <Vehicles make={make} model={model} />}
        </div>
    );
}

export default App;
