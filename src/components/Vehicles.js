import { getVehicles } from "../services/vehicles";
import { useEffect, useState } from "react";
import Card from "./Card";
import BackButton from "./BackButton";
import "./style.css";

export default function Vehicles({ back, make, model }) {
    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState("");

    useEffect(() => {
        let mounted = true;
        getVehicles(make, model).then((items) => {
            if (mounted) {
                if (typeof items === "string") {
                    setError("something went wrong, please try again.");
                } else {
                    setList(items);
                }
            }
        });
        return () => (mounted = false);
    }, [make, model]);
    if (error) {
        return (
            <div>
                <h3>{error}</h3>
                <BackButton back={back} />
            </div>
        );
    } else if (list.length === 0) {
        return (
            <div>
                <span className="title">
                    there are no available vehicles for this model
                </span>
                <BackButton back={back} />
            </div>
        );
    } else if (selected) {
        return (
            <div>
                <BackButton back={() => setSelected("")} />
                {list
                    .filter((item) => item.fuelType === selected)
                    .map((item, i) => (
                        <Card
                            key={i}
                            engPS={item.enginePowerPS}
                            engKW={item.enginePowerKW}
                            bodyType={item.bodyType}
                            engineCapacity={item.engineCapacity}
                        />
                    ))}
                {list.filter((item) => item.fuelType === selected).length ===
                    0 && (
                    <span className="title">no models for this fuel Type</span>
                )}
            </div>
        );
    } else {
        return (
            <div>
                <BackButton back={back} />
                {["Diesel", "Benzin", "Hybrid"].map((item, i) => (
                    <Card
                        make={item}
                        onClick={() => setSelected(item)}
                        key={i}
                    />
                ))}
            </div>
        );
    }
}
