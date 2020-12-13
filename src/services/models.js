export function getModels(make) {
    return fetch(`http://localhost:8080/api/models?make=${make}`).then(
        (data) => {
            if (data.ok) {
                return data.json();
            } else {
                return "something went wrong";
            }
        }
    );
}
