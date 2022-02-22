import React from "react";
import Loadable from 'react-loadable';

const LoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

const loadable = (loader, loading=LoadingComponent) => {
    return Loadable({
        loader,
        loading
    });
};
export default loadable;
