import Chart from "chart.js";
import { createRef, useEffect, useRef, useState } from 'react';

const BarPlot = ({ Data, Options }) => {

    const canvasRef = useRef(null);

    const [chart, setChart] = useState(null);

    const [data, setData] = useState({
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    });

    const [options, setOptions] = useState({
        scales: {
            y: {
                beginAtZero: true
            }
        }
    });

    useEffect(() => {

        if (!canvasRef) return;

        // if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
        setChart(chart);
        // }

    }, [canvasRef]);

    useEffect(() => {

        if (!chart) return;
        chart.data.datasets[0].data = data;
        chart.update();

    }, [data, chart]);

    return (
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
    );

}

export default BarPlot;