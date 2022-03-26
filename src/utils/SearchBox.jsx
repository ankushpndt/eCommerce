import { SearchBoxResult } from "./SearchBoxResult";

import "./SearchBox.css";

import { useProduct } from "../Context/productContext";

export const SearchBox = ({ setToggleDropbox, searchTerm }) => {
    const { products } = useProduct();
    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ? item
            : !item
    );

    return (
        <div className="searchBox">
            {searchTerm?.length !== 0 && (
                <div className="searchBox__results">
                    {filteredProducts?.map((product) => (
                        <SearchBoxResult
                            key={product?._id}
                            product={product}
                            setToggleDropbox={setToggleDropbox}
                        />
                    ))}
                </div>
            )}

            {searchTerm?.length === 0 && (
                <>
                    <h4 className="searchBox__heading">Search</h4>
                    <div className="searchBox__empty">No results found</div>
                </>
            )}
        </div>
    );
};
