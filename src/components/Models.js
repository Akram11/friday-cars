import { getModels } from "../services/models";
import { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./searchBar";
import BackButton from "./BackButton";
import "./style.css";

export default function Models({ make, handleSetModel, back }) {
    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    let [searchTerm, setSearchTerm] = useState("");

    let results = !searchTerm
        ? list
        : list.filter((l) => l.toLowerCase().includes(searchTerm));

    useEffect(() => {
        let mounted = true;
        getModels(make).then((items) => {
            if (mounted) {
                typeof items === "string"
                    ? setError("something went wrong, please try again.")
                    : setList(items);
            }
        });
        return () => (mounted = false);
    }, [make]);

    return error ? (
        <div>
            <h3>{error}</h3>
            <BackButton back={back} />
        </div>
    ) : (
        <>
            {list.length === 0 ? (
                <div>
                    <span className="title">
                        there is no models available for this manufacturer
                    </span>
                    <BackButton back={back} />
                </div>
            ) : (
                <div>
                    <span className="title">Please choose the model:</span>
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
            )}
        </>
    );
}
