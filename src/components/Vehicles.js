import { getVehicles } from "../services/vehicles";

import { useEffect, useState } from "react";
import Card from "./Card";

export default function Vehicles({ make, model, updateScreen }) {
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

    return list.length === 0 ? (
        <h2>Uh oh! there are no available vehicles for this model</h2>
    ) : (
        <div>
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
