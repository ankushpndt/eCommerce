export const validateForm = ({ name, email, password, setErrorMessage }) => {
    if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
        setErrorMessage("Invalid Name. Must be at least 3 characters long.");
        return false;
    }

    if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i.test(email)) {
        setErrorMessage("Invalid Email");
        return false;
    }
    if (!/^(?=.*?[0-9]).{8,}$/i.test(password)) {
        setErrorMessage("Invalid Password");
        return false;
    }
    setErrorMessage("");
    return true;
};
