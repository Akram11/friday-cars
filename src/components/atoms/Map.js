import "./Map.scss";

export default function Map({ make, model, fuelType }) {
    return (
        <span className="map">
            {make && make} {model && <> &gt; {model}</>}{" "}
            {fuelType && <> &gt; {fuelType}</>}
        </span>
    );
}
