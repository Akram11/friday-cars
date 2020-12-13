export const getMakes = async () => {
    try {
        const data = await fetch("http://localhost:8080/api/makes");
        return await data.json();
    } catch (err) {
        return "something went wrong";
    }
};
