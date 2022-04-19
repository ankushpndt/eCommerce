export const Backdrop = ({ toggle, className }) => {
    return (
        <div
            className={`backdrop ${className}`}
            onClick={() => toggle(false)}
        ></div>
    );
};
