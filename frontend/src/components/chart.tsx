import { LineChart } from '@mui/x-charts/LineChart';

interface ChartProps {
    heights: number[];
    windSpeeds: number[];
}

export default function Chart({ heights, windSpeeds }: ChartProps) {
    const series = [
        {
            data: windSpeeds.length > 0 ? windSpeeds : [], // Only show data if it exists
            showMark: false, // Disable marks on data points
        },
    ];

    const otherSetting = {
        yAxis: [{ label: 'Height' }], // Label for the y-axis
        grid: { horizontal: true, vertical: true },
    };

    return (
        <LineChart
            xAxis={[{
                data: heights.length > 0 ? heights : [], // Only show data if it exists
                label: 'Wind Speeds', // Label for the x-axis
                valueFormatter: (value) => value.toString(), // Format values as strings
            }]} 
            series={series}
            {...otherSetting}
        />
    );
}