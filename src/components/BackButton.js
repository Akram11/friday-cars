import "./BackButton.scss";

export default function BackButton({ back }) {
    return (
        <button
            type="button"
            className="btn-back"
            onClick={() => {
                back();
            }}
        >
            Back
        </button>
    );
}
