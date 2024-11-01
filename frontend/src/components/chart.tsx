import { LineChart } from '@mui/x-charts/LineChart';

interface ChartProps {
    heights: number[];
    windSpeeds: number[];
}

export default function Chart({ heights, windSpeeds }: ChartProps) {
    const series = [
        {
            data: windSpeeds.length > 0 ? windSpeeds : [], // Only show data if it exists
        },
    ];

    return (
        <LineChart
            xAxis={[{ data: heights.length > 0 ? heights : [] }]} // Only show data if it exists
            series={series}
            grid={{ vertical: true, horizontal: true }}
        />
    );
}
