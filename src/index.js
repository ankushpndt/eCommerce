import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider } from "./Context/cart-context";
import { ProductProvider } from "./Context/productContext";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/authContext";
const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <Router>
            <AuthProvider>
                <ProductProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </ProductProvider>
            </AuthProvider>
        </Router>
    </StrictMode>,
    rootElement
);
