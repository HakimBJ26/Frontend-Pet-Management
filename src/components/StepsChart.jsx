import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function StepsChart({ petActivityData, trackingEnded ,selectedPetId}) {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (
      petActivityData &&
      petActivityData.lastUpdated &&
      petActivityData.steps
    ) {
      const currentTime = new Date(petActivityData.lastUpdated);
      const formattedTime = `${String(currentTime.getHours()).padStart(
        2,
        "0"
      )}:${String(currentTime.getMinutes()).padStart(2, "0")}`;
      const newEntry = {
        time: formattedTime,
        steps: parseInt(petActivityData.steps, 10),
      };

      setDataset((prevDataset) => {
        
        const updatedDataset = [...prevDataset, newEntry];

        
        if (updatedDataset.length > 10) {
          return updatedDataset.slice(-10);
        }

        return updatedDataset;
      });
    }
  }, [petActivityData]);

  useEffect(() => {
    if (trackingEnded) {
      setDataset([]);
    }
  }, [trackingEnded,selectedPetId]);

  const BarWithBorderRadius = (props) => {
    const { fill, x, y, width, height } = props;
    return (
      <rect x={x} y={y} width={width} height={height} fill={fill} rx={12} />
    );
  };

  return (
    <BarChart width={380} height={300} data={dataset}>
      <CartesianGrid stroke="none" />
      <XAxis dataKey="time" axisLine={false} tickLine={false} />
      <YAxis axisLine={false} tickLine={false} />
      <Tooltip />
      <Bar
        barSize={20}
        dataKey="steps"
        fill="#68a66b"
        shape={<BarWithBorderRadius />}
      />
    </BarChart>
  );
}
