import { LineChart } from '@mui/x-charts/LineChart';

interface ChartProps {
    heights: number[];
    windSpeeds: number[];
}

export default function Chart({ heights, windSpeeds }: ChartProps) {
    const series = [
        {
            data: heights.length > 0 ? heights : [], // Only show data if it exists
            showMark: false, // Disable marks on data points
        },
    ];

    const otherSetting = {
        yAxis: [
            {
                label: 'Height [m]',        // Label for the y-axis
                labelFontSize: 20,          // Increase font size for y-axis label
                tickFontSize: 18,           // Increase font size for y-axis tick values (numbers)
            }
        ],
        grid: { horizontal: true, vertical: true },
    };

    return (
        <LineChart
            sx={{strokeWidth: 1}}
            xAxis={[{
                data: windSpeeds.length > 0 ? windSpeeds : [], // Only show data if it exists
                label: 'Wind Speed [m/s]', // Label for the x-axis
                labelFontSize: 20,         // Increase font size for x-axis label
                tickFontSize: 18,          // Increase font size for x-axis tick values (numbers)
                valueFormatter: (value) => value.toString(), // Format values as strings
            }]} 
            series={series}
            {...otherSetting}
        />
    );
}