import { Link } from "react-router-dom";

export const SearchBoxResult = ({ product, setToggleDropbox }) => {
    return (
        <Link
            to={`/product/${product?._id}`}
            style={{
                textDecoration: "none",
                color: "black",

                marginBottom: "1rem"
            }}
            onClick={
                setToggleDropbox ? () => setToggleDropbox(false) : () => {}
            }
            className="searchBox__result"
        >
            <div className="sb">
                <img
                    className="avatar__img"
                    src={product?.image}
                    alt="avatar"
                />

                <div className="result__content">
                    <h5 className="title">{product?.name}</h5>
                </div>
            </div>
        </Link>
    );
};
