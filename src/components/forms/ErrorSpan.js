import React from 'react';

const ErrorSpan = (props) => {
    return <span className="text-danger">{ props.children }</span>
}

export default ErrorSpan;