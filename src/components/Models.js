import { getModels } from "../services/models";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function Models({ make, handleSetModel }) {
    const [list, setList] = useState([]);
    useEffect(() => {
        let mounted = true;
        getModels(make).then((items) => {
            if (mounted) {
                console.log(items);
                setList(items);
            }
        });
        return () => (mounted = false);
    }, []);

    return list.length === 0 ? (
        <h2>Uh oh! there is no models available for this make</h2>
    ) : (
        <div>
            {list.map((item, i) => (
                <Card
                    onClick={() => handleSetModel(item)}
                    model={item}
                    key={i}
                />
            ))}
        </div>
    );
}
