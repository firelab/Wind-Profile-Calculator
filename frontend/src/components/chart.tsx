import { LineChart } from '@mui/x-charts/LineChart';

interface ChartProps {
    heights: number[];
    windSpeeds: number[];
}

export default function Chart({ heights, windSpeeds}: ChartProps) {

    return (
        <LineChart
            xAxis={[{
                data: windSpeeds.length > 0 ? windSpeeds : [], 
                label: 'Wind Speed [m/s]', 
                labelFontSize: 20,         
                tickFontSize: 18,          
                valueFormatter: (value) => value.toString(), 
            }]} 
            series={[{
                data: heights.length > 0 ? heights : [], 
                showMark: false, // We will send the indices that the height we want is at, and go from there. 
            }]}
            yAxis={[{
                    label: 'Height [m]',        
                    labelFontSize: 20,          
                    tickFontSize: 18,           
            }]}
            grid={{ vertical: true, horizontal: true }}
        />
    );
}