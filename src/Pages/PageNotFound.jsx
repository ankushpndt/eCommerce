import "./PageNotFound.css";
export const PageNotFound = () => {
    return (
        <div className="page__not__found">
            <h1 className="page__not__found__heading">
                4
                <span>
                    <i class="fas fa-ghost"></i>
                </span>
                4
            </h1>
            <h2 className="page__not__found__heading__two">
                Error: 404 page not found
            </h2>
            <p className="page__not__found__content">
                Sorry, the page you're looking for cannot be accessed
            </p>
        </div>
    );
};
