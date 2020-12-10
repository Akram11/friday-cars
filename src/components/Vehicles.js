import { getVehicles } from "../services/vehicles";
import { useEffect, useState } from "react";
import Card from "./Card";
import BackButton from "./BackButton";

export default function Vehicles({ back, make, model, updateScreen }) {
    const [list, setList] = useState([]);
    const [benzin, setBenzin] = useState([]);
    const [diesel, setDezil] = useState([]);
    const [hybrid, setHybrid] = useState([]);
    const [selected, setselected] = useState("");

    const options = ["hybrid", "diesel", "benzin"];

    useEffect(() => {
        let mounted = true;
        getVehicles(make, model).then((items) => {
            if (mounted) {
                setList(items);
                setDezil(items.filter((item) => item.fuelType === "Diesel"));
                setBenzin(items.filter((item) => item.fuelType === "Benzin"));
                setHybrid(items.filter((item) => item.fuelType === "Hybrid"));
            }
        });
        return () => (mounted = false);
    }, []);

    if (typeof list === "string") {
        return <h3>{list} please refresh the page</h3>;
    } else {
        return list.length === 0 ? (
            <h3>there are no available vehicles for this model</h3>
        ) : (
            <div>
                <BackButton back={back} />
                {}
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
