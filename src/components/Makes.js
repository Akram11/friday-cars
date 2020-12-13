import { getMakes } from "../services/makes";
import { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./searchBar";
import "./style.css";
import BackButton from "./BackButton";

export default function Makes({ handleSetMake }) {
    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setloading] = useState(true);
    let [searchTerm, setSearchTerm] = useState("");

    let results = !searchTerm
        ? list
        : list.filter((l) => l.toLowerCase().includes(searchTerm));

    useEffect(() => {
        let mounted = true;
        getMakes().then((items) => {
            if (mounted) {
                typeof items === "string"
                    ? setError("something went wrong, please try again.")
                    : setList(items);
            }
            setloading(false);
        });
        return () => (mounted = false);
    }, []);

    return error ? (
        <div>
            <h3>{error}</h3>
            <BackButton back={window.location.reload()} />
        </div>
    ) : (
        <>
            {loading && <p>loading...</p>}
            <span className="title"> Please choose the manufacturer: </span>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {results.map((item, i) => (
                <Card
                    onClick={() => {
                        handleSetMake(item);
                    }}
                    make={item}
                    key={i}
                />
            ))}
        </>
    );
}
