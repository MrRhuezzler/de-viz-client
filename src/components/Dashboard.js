import React, { useContext, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import Plotly from "plotly.js-basic-dist-min";
import BarPlot from "./Plots";
import { VscSymbolColor, VscRefresh } from "react-icons/vsc";
import OptionsLayoutProvider, { layoutContext, generateLayout, optionsContext } from "../hooks/optionsLayoutContext";
import { accentColors, accentColorsIsDark } from "../data/colors";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DashboardComponent = ({ layoutItem }) => {

    const [layout, setLayout] = useContext(layoutContext);
    const [options, setOptions] = useContext(optionsContext);
    // const currOptions = options.find(e => e.i === layoutItem.i);

    const [toggleChangeColor, setToggleChangeColor] = useState(false);

    useEffect(() => {
        Plotly.Plots.resize(`plot-${layoutItem.i}`);
    }, [layout]);

    return (
        <>
            <div className={`flex flex-row items-center h-[50px] justify-between py-2 px-4 bg-${options.find(e => e.i === layoutItem.i).accentColor}`} style={{ cursor: "move" }}>
                <h1 className={accentColorsIsDark[options.find(e => e.i === layoutItem.i).accentColor] ? "text-white" : "text-black"}>{options.find(e => e.i === layoutItem.i).title}</h1>
                <div className="space-x-2">
                    <button className="rounded-full p-2 bg-white font-bold" onClick={(e) => { setToggleChangeColor(!toggleChangeColor) }}>
                        <VscSymbolColor></VscSymbolColor>
                    </button>
                    <button className="rounded-full p-2 bg-white font-bold" onClick={(e) => { setToggleChangeColor(!toggleChangeColor) }}>
                        <VscRefresh></VscRefresh>
                    </button>
                </div>
            </div>
            {/* {toggleChangeColor && */}
            <div className={`${toggleChangeColor ? "" : "hidden"} flex flex-row justify-center p-2 space-x-2`}>
                {Object.keys(accentColors).map((color) =>
                    <button
                        title={color}
                        onClick={(e) => {
                            const currOptions = options.find(e => e.i === layoutItem.i);
                            currOptions.accentColor = color;
                            setOptions(options.filter(e => e.i !== layoutItem.i).concat(currOptions));
                        }}
                        className={`w-[20px] aspect-square rounded-full bg-${color}`}></button>)}
            </div>
            {/* } */}
            <div className="h-[calc(100%-50px)]" onMouseDown={(e) => { e.stopPropagation() }}>
                <div className="w-full h-full"><BarPlot id={`plot-${layoutItem.i}`} layoutItem={layoutItem}></BarPlot></div>
            </div>
        </>
    );

}

const DashboardParent = (props) => {

    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [compactType, setCompactType] = useState("vertical");
    const [mounted, setMounted] = useState(false);
    const [layout, setLayout] = useContext(layoutContext);
    const [options,] = useContext(optionsContext);

    const [currBackgroundColor, setCurrBackgroundColor] = useState("poppy");
    // const [layouts, setLayouts] = useState({
    //     lg: props.initialLayout ? props.initialLayout : generateLayout()
    // });

    useEffect(() => {
        setMounted(true);
    }, []);

    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint);
    }

    const onCompactTypeChange = () => {
        setCompactType((compactType) => (
            compactType === "horizontal"
                ? "vertical"
                : compactType === "vertical"
                    ? null
                    : "horizontal"
        ));
    }

    const onLayoutChange = (_layout, _layouts) => {
        props.onLayoutChange(_layout, _layouts);
        setLayout(_layouts);
        console.log(currentBreakpoint, _layouts);
    }

    const onNewLayout = () => {
        setLayout({
            lg: generateLayout()
        })
    }

    const generateDOM = () => {
        return _.map(layout[currentBreakpoint], (l, i) => {
            return (
                <div className="rounded-lg shadow-md" key={i}>
                    <DashboardComponent layoutItem={l}></DashboardComponent>
                </div>
            );
        });
    }

    const getGridLayoutWithOptions = (onlyGridlayout, options) => {
        const gridLayoutWithOptions = {};
        for (const key of Object.keys(onlyGridlayout)) {
            gridLayoutWithOptions[key] = onlyGridlayout[key].map((l) => ({ gridLayout: onlyGridlayout, options }));
        }
        return gridLayoutWithOptions;
    }

    const getGridLayouts = (layout) => {
        const onlyGridLayouts = {};
        for (const key of Object.keys(layout)) {
            onlyGridLayouts[key] = layout[key].map((l) => l.gridLayout);
        }
        return onlyGridLayouts;
    }

    return (
        <div className="bg-white-smoke h-full">
            <ResponsiveReactGridLayout
                className={`layout ${currBackgroundColor}`}
                // style={{ height: null }}
                {...props}
                layouts={layout}
                onDrag={(layouts, oldItem, newItem, placeholder, event, element) => { setCurrBackgroundColor(options.find(e => e.i === newItem.i).accentColor) }}
                onResize={(layouts, oldItem, newItem, placeholder, event, element) => { setCurrBackgroundColor(options.find(e => e.i === newItem.i).accentColor) }}
                onBreakpointChange={onBreakpointChange}
                onLayoutChange={onLayoutChange}
                measureBeforeMount={false}
                useCSSTransforms={mounted}
                compactType={compactType}
                preventCollision={!compactType}
            >
                {generateDOM()}
            </ResponsiveReactGridLayout>
        </div >
    );
}

const Dashboard = (props) => {

    return (
        <OptionsLayoutProvider>
            <DashboardParent {...props}></DashboardParent>
        </OptionsLayoutProvider>
    )

}

export default Dashboard;