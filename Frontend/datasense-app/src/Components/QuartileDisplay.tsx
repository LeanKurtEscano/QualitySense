import React from 'react';
import BoxPlotChart from './OutlierChart';

interface BoxPlotData {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
}

interface BoxPlotChartProps {
    data: BoxPlotData[];
    labels: string[];
}
const QuartileDisplay: React.FC<BoxPlotChartProps> = ({ data, labels }) => {

    return (
        <section className='w-full h-auto  flex-col justify-center flex-wrap items-center'>
            <div className='flex pl-2'>
                <h1 className='font-bold text-3xl text-cyan-500 pl-4 mb-6'>
                    Data Range Summary
                </h1>
            </div>
            <div className='flex w-[800px] h-auto flex-row justify-center items-center flex-wrap'>
                {data.map((plotdata, index) => (
                    <div key={index} className='w-[400px] h-[300px] '> {/* Adjust width and add margin */}
                        <BoxPlotChart
                            min={plotdata.min}
                            q1={plotdata.q1}
                            median={plotdata.median}
                            q3={plotdata.q3}
                            max={plotdata.max}
                            label={labels[index]}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default QuartileDisplay