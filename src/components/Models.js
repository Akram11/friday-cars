import { getModels } from "../services/models";
import { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./searchBar";
import "./style.css";

export default function Models({ make, handleSetModel, back }) {
    const [list, setList] = useState([]);
    let [searchTerm, setSearchTerm] = useState("");

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
        return (
            <h2>
                <h2>{list} please refresh the page</h2>{" "}
            </h2>
        );
    } else {
        return list.length === 0 ? (
            <h2>Uh oh! there is no models available for this make</h2>
        ) : (
            <div className="search-container">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

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
