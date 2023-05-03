import React from "react";
import {FaList, FaSearchLocation} from "react-icons/fa"

export default function Header(props) {
    return (
        <div className="header">
            <ExitHeaderButton {...props}/>
        </div>
    )
}

function ExitHeaderButton(props) {
    if (props.showList) {
        return (
            <FaSearchLocation
                className="header-icon"
                size={'2em'}
                onClick={() => props.setShowList(!props.showList)}
            />
        )
    }
    return (
        <FaList
            className="header-icon"
            size={'2em'}
            onClick={() => props.setShowList(!props.showList)}
        />
    )
}