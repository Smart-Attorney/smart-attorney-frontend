import React, { ReactNode } from "react";

interface PopupProps {
    trigger: boolean;
    children: ReactNode;
}

function Popup(props: PopupProps) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="inner-popup">
                <button className="Save"> save </button>
                {props.children}
            </div>
        </div>
    ): "";
}

export default Popup;
