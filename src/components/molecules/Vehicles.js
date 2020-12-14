import { getVehicles } from "../../services/vehicles";
import { useEffect, useState } from "react";
import Card from "../atoms/Card";
import BackButton from "../atoms/BackButton";
import Title from "../atoms/Title";
import Map from "../atoms/Map";

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

    const renderFuelTypeOptions = (
        <div>
            <Title text={"Please choose the fuel type:"} />
            <Map make={make} model={model} />
            <BackButton back={back} />
            {["Diesel", "Benzin", "Hybrid"].map((item, i) => (
                <Card make={item} onClick={() => setSelected(item)} key={i} />
            ))}
        </div>
    );

    const renderResult = () => {
        const filteredList = list.filter((item) => item.fuelType === selected);
        return (
            <div>
                <Map make={make} model={model} fuelType={selected} />
                <BackButton back={() => setSelected("")} />

                {filteredList.length === 0 ? (
                    <Title text={"no available models for this fuel Type"} />
                ) : (
                    <>
                        <Title text={" available models:"} />
                        {filteredList.map((item, i) => (
                            <Card
                                key={i}
                                engPS={item.enginePowerPS}
                                engKW={item.enginePowerKW}
                                bodyType={item.bodyType}
                                engineCapacity={item.engineCapacity}
                            />
                        ))}
                    </>
                )}
            </div>
        );
    };

    const renderErrorMessage = (
        <div>
            <Title text={error} />
            <BackButton back={back} />
        </div>
    );

    const renderEmptyList = (
        <div>
            <Title text={"there are no available vehicles for this model"} />
            <BackButton back={back} />
        </div>
    );

    return (
        <>
            {error && renderErrorMessage}
            {!error && list.length === 0 && renderEmptyList}
            {!error && list.length !== 0 && selected && renderResult()}
            {!error && list.length !== 0 && !selected && renderFuelTypeOptions}
        </>
    );
}
