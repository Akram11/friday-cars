import "./style.css";

export default function Card({ ...props }) {
    return (
        <>
            <li onClick={props.onClick} className="card-style">
                {props.make}
                {props.model}
                {props.bodyType && (
                    <span>
                        {props.bodyType} : {props.engKW} KW / {props.engPS} PS [
                        {props.engineCapacity}]
                    </span>
                )}
            </li>
        </>
    );
}
