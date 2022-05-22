import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

const BarPlot = ({ Data, Options, layoutItem, id }) => {

    return (
        <Plot
            divId={`plot-${layoutItem.i}`}
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                },
                { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{ autosize: true, title: 'A Fancy Plot' }}
            useResizeHandler={true}
            className="w-full h-full"
        />
    );

}

export default BarPlot;