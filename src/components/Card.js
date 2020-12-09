import "./style.css";

export default function Card({ ...props }) {
    return (
        <>
            <li onClick={props.onClick} className="card-style">
                {props.make}
                {props.model}
                {props.engPS}
                {props.engKW}
                {props.fuelType}
                {props.bodyType}
                {props.engineCapacity}
            </li>
        </>
    );
}
