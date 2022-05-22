import React, { useState } from 'react';
import _ from "lodash";

export const generateOptions = () => {
    return _.map(_.range(0, 5), (item, i) => {
        var y = (_.random(0, 1));
        return {
            i: i.toString(),
            accentColor: (y === 1) ? "spirited" : "poppy",
            title: "Plotsss",
        }
    })
}

export const generateLayout = () => {
    return _.map(_.range(0, 5), (item, i) => {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: (_.random(0, 5) * 2) % 12,
            y: y,
            w: 4,
            h: 8,
            minW: 4,
            minH: 8,
            i: i.toString(),
            static: false,
        }
    })
}

export const layoutContext = React.createContext(null);
export const optionsContext = React.createContext(null);

const OptionsLayoutProvider = (props) => {

    const [layout, setLayout] = useState({ lg: generateLayout() });
    const [options, setOptions] = useState(generateOptions());

    return (
        <optionsContext.Provider value={[options, setOptions]}>
            <layoutContext.Provider value={[layout, setLayout]}>
                {props.children}
            </layoutContext.Provider>
        </optionsContext.Provider>
    );

}

export default OptionsLayoutProvider;