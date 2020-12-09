import { getMakes } from "../services/makes";
import { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./searchBar";
import "./style.css";

export default function Makes({ handleSetMake }) {
    const [list, setList] = useState([]);
    let [searchTerm, setSearchTerm] = useState("");

    let results = !searchTerm
        ? list
        : list.filter((l) => l.toLowerCase().includes(searchTerm));

    useEffect(() => {
        let mounted = true;
        getMakes().then((items) => {
            if (mounted) {
                setList(items);
            }
        });
        return () => (mounted = false);
    }, []);

    return typeof list === "string" ? (
        <h2>{list} please refresh the page</h2>
    ) : (
        <>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* <div className="search-container">
                <input
                    autoFocus
                    className="input"
                    placeholder="filter"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
            </div> */}
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
