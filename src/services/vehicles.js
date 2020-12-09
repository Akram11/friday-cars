export function getVehicles(make, model) {
    return fetch(
        `http://localhost:8080/api/vehicles?make=${make}&model=${model}`
    ).then((data) => {
        if (data.ok) {
            return data.json();
        } else {
            return "something went wrong";
        }
    });
}
