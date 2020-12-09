import { getVehicles } from "../services/vehicles";

import { useEffect, useState } from "react";
import Card from "./Card";

export default function Vehicles({ back, make, model, updateScreen }) {
    const [list, setList] = useState([]);
    useEffect(() => {
        let mounted = true;
        getVehicles(make, model).then((items) => {
            if (mounted) {
                console.log(items);
                setList(items);
            }
        });
        return () => (mounted = false);
    }, []);

    if (typeof list === "string") {
        return (
            <h2>
                <h2>{list} please refresh the page</h2>{" "}
            </h2>
        );
    } else {
        return list.length === 0 ? (
            <h2>Uh oh! there are no available vehicles for this model</h2>
        ) : (
            <div>
                <button
                    type="button"
                    className="btn-back"
                    onClick={() => {
                        console.log("d");
                        back();
                    }}
                >
                    Back
                </button>
                {list.map((item, i) => (
                    <Card
                        updateScreen={updateScreen}
                        make={item.make}
                        model={item.model}
                        engPS={item.enginePowerPS}
                        engKW={item.enginePowerKW}
                        fuelType={item.fuelType}
                        bodyType={item.bodyType}
                        engineCapacity={item.engineCapacity}
                        key={i}
                    />
                ))}
            </div>
        );
    }
}
