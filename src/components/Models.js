import { getModels } from "../services/models";
import { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import BackButton from "./BackButton";
import Title from "./Title";
import Map from "./Map";

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
            <Title text={error} />
            <BackButton back={back} />
        </div>
    ) : (
        <>
            {list.length === 0 ? (
                <div>
                    <Title
                        text={
                            "there is no models available for this manufacturer"
                        }
                    />
                    <Map make={make} />
                    <BackButton back={back} />
                </div>
            ) : (
                <div>
                    <Title text={"Please choose the model:"} />
                    <Map make={make} />
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
