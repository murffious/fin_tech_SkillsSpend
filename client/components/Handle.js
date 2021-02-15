import React from 'react';
import './Handle.css';
export function Handle(props) {
    return (React.createElement("div", Object.assign({ className: "Handle", tabIndex: 0, "data-cypress": "draggable-handle" }, props),
        React.createElement("svg", { viewBox: "0 0 20 20" },
            React.createElement("path", { d: "M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" }))));
}