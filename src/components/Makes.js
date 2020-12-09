import { getMakes } from "../services/makes";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function Makes({ handleSetMake }) {
    const [list, setList] = useState([]);
    let [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    let results = !searchTerm
        ? list
        : list.filter((l) => l.toLowerCase().includes(searchTerm));

    useEffect(() => {
        let mounted = true;
        getMakes().then((items) => {
            if (mounted) {
                console.log(items);
                setList(items);
            }
        });
        return () => (mounted = false);
    }, []);

    console.log(searchTerm);
    return typeof list === "string" ? (
        <h2>{list} please refresh the page</h2>
    ) : (
        <div>
            <input
                placeholder="filter"
                value={searchTerm}
                onChange={handleSearch}
            />
            {results.map((item, i) => (
                <Card
                    onClick={() => {
                        handleSetMake(item);
                    }}
                    make={item}
                    key={i}
                />
            ))}
        </div>
    );
}
