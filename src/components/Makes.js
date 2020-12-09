import { getMakes } from "../services/makes";
import { getModels } from "../services/models";

import { useEffect, useState } from "react";
import Card from "./Card";

export default function Makes({ handleSetMake }) {
    const [list, setList] = useState([]);
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

    console.log(list);
    return typeof list === "string" ? (
        <h2>{list} please refresh the page</h2>
    ) : (
        <div>
            {list.map((item, i) => (
                <Card
                    // updateScreen={updateScreen}
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
