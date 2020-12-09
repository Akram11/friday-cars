export function getMakes() {
    return fetch("http://localhost:8080/api/makes").then((data) => {
        if (data.ok) {
            return data.json();
        } else {
            return "something went wrong";
        }
    });
}
