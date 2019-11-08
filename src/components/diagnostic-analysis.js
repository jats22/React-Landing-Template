import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  FlexibleXYPlot,
  DiscreteColorLegend,
  Hint,
} from 'react-vis';

const ITEMS = [
  {title: '  Your performance', color: "rgb(149, 143, 186)" , strokeWidth:'1000'},
  {title: '  Others on the platform', color: 'rgba(149, 142, 186, 0.58)' },
];

export default function DiagnosticAnalysis(props) {
  return (
    <div style={{marginBottom:'100px'}}>
      <FlexibleXYPlot margin={{ bottom: 80 }} xType="ordinal" width={290} height={400}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          animation
          color='rgb(149, 143, 186)'
          data={[
            { x: 'Analog', y: 10 },
            { x: 'Digital', y: 5 },
            { x: 'Comp. Arch', y: 15 }
          ]}
        >
        </VerticalBarSeries>
        <VerticalBarSeries
          color='rgba(149, 142, 186, 0.58)'
          data={[
            { x: 'Analog', y: 12 },
            { x: 'Digital', y: 2 },
            { x: 'Comp. Arch', y: 11 }
          ]}
        >
        </VerticalBarSeries>
        <DiscreteColorLegend orientation="horizontal" width={290} items={ITEMS} />
      </FlexibleXYPlot>
    </div>
  );
}