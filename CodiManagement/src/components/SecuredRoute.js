import React from "react";
import { Route } from "react-router-dom";
export const Forbidden = () => (
    <div className="container">
        <h1>Forbidden</h1>
    </div>
);
const SecuredRoute = ({ component, render, path, isAdmin }) => {
    const renderIf = (props) => {

        if (!isAdmin) {
            return <Forbidden />;
        }
        if (render) {
            return render(props);
        }
        const Component = component;
        return <Component {...props} />;
    };
    return <Route path={path} render={renderIf} />;
};
export default SecuredRoute;