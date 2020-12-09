export function getModels(make) {
    console.log(make);
    return fetch(`http://localhost:8080/api/models?make=${make}`).then(
        (data) => {
            if (data.ok) {
                return data.json();
            } else {
                throw new Error("Something went wrong");
            }
        }
    );
}
