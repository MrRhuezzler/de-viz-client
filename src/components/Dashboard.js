import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import BarPlot from "./RechartsPlots";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const generateLayout = () => {
    return _.map(_.range(0, 5), function (item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: (_.random(0, 5) * 2) % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            static: Math.random() < 0.05
        };
    });
}

const DashboardComponent = (props) => {

    const dash = useRef(null);

    useEffect(() => {
        console.log("ASDS", dash.current);
        console.log("SDADS", dash.current);
    }, [dash]);

    return (
        <div ref={dash} className="w-full h-full"><BarPlot></BarPlot></div>
    );

}

const Dashboard = (props) => {

    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [compactType, setCompactType] = useState("vertical");
    const [mounted, setMounted] = useState(false);
    const [layouts, setLayouts] = useState({
        lg: props.initialLayout ? props.initialLayout : generateLayout()
    });

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

    const onLayoutChange = (layout, layouts) => {
        props.onLayoutChange(layout, layouts);
    }

    const onNewLayout = () => {
        setLayouts({
            lg: generateLayout()
        })
    }

    const generateDOM = () => {
        return _.map(layouts.lg, (l, i) => {
            return (
                <div className="p-5" key={i}>
                    <DashboardComponent></DashboardComponent>
                </div>
            );
        });
    }

    return (
        <div className="h-full bg-white-smoke">
            <ResponsiveReactGridLayout
                {...props}
                layouts={layouts}
                onBreakpointChange={onBreakpointChange}
                onLayoutChange={onLayoutChange}
                measureBeforeMount={false}
                useCSSTransforms={mounted}
                compactType={compactType}
                preventCollision={!compactType}
            >
                {generateDOM()}
            </ResponsiveReactGridLayout>
        </div>
    );
}

export default Dashboard;