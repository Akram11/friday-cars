import { getModels } from "../services/models";
import { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./searchBar";
import BackButton from "./BackButton";
import "./style.css";

export default function Models({ make, handleSetModel, back }) {
    const [list, setList] = useState([]);
    let [searchTerm, setSearchTerm] = useState("");
    let [fuelType, setFuelType] = useState(["Diesel", "Benzin", "Hybrid"]);

    let results = !searchTerm
        ? list
        : list.filter((l) => l.toLowerCase().includes(searchTerm));

    useEffect(() => {
        let mounted = true;
        getModels(make).then((items) => {
            if (mounted) {
                setList(items);
            }
        });
        return () => (mounted = false);
    }, []);

    if (typeof list === "string") {
        return <h3>{list} please refresh the page</h3>;
    } else {
        return list.length === 0 ? (
            <h3>there is no models available for this manufacturer</h3>
        ) : (
            <div className="search-container">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <BackButton back={back} />
                {results.map((item, i) => (
                    <Card
                        onClick={() => handleSetModel(item)}
                        model={item}
                        key={i}
                    />
                ))}
            </div>
        );
    }
}
