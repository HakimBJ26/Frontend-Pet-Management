import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, Legend } from "recharts";
import "../styles/VetAppointments.css";
import petDataService from "../service/PetDataService";



const NutritionBarChart = ({petID}) => {
 const theme = useTheme()
  const [chartData,setChartData]=useState([])
  useEffect(()=>{
    const fetchData = async () => {
      try{
          const res = await petDataService.getHealthStats(petID);
          setChartData(res)
      }catch(err){
        console.log(err)
      }
    }

    fetchData()

  },[])
  return (
    <Box className="countainer" sx={{ paddingX: 2 }}>
      <Typography variant="h4" fontWeight="bold">
        Health Stats
      </Typography>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            bottom: 5,
          }}
          barSize={10}
          barCategoryGap={14}
        >
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="left"
            layout="horizontal"
            iconType="circle"
            wrapperStyle={{ paddingTop: 20 }}
          />
          <Bar
            dataKey="protein"
            stackId="a"
            fill={theme.palette.healthStatsChart.protien}
            radius={[40, 40, 40, 40]}
          />
          <Bar
            dataKey="carb"
            stackId="a"
            fill={theme.palette.healthStatsChart.carb}
            radius={[40, 40, 40, 40]}
          />
          <Bar
            dataKey="fat"
            stackId="a"
            fill={theme.palette.healthStatsChart.fat}
            radius={[40, 40, 40, 40]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default NutritionBarChart;
