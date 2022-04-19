import React, { useState } from "react";

import { SearchBox } from "../utils/SearchBox";
import { Backdrop } from "../utils/Backdrop";
import "./Searchbar.css";
export const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [toggleDropbox, setToggleDropbox] = useState(false);

    return (
        <div>
            <div className="search__bar">
                {toggleDropbox && (
                    <Backdrop
                        toggle={setToggleDropbox}
                        className="search__bar__backdrop"
                    />
                )}

                <input
                    type="search"
                    value={searchTerm}
                    onFocus={() => setToggleDropbox(true)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search__input"
                    placeholder="Search"
                />
                {toggleDropbox && (
                    <SearchBox
                        setToggleDropbox={setToggleDropbox}
                        searchTerm={searchTerm}
                    />
                )}
            </div>
        </div>
    );
};
