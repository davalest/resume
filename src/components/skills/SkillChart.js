import React from 'react';
import {
    PieChart, Pie, Cell, Label, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];

const SkillChart = (props) => {
    return (
        <ResponsiveContainer width="100%"
                             height={300}
        >
            <PieChart>
                <Pie
                    data={props.data}
                    innerRadius={50}
                    outerRadius={80}
                    labelLine={false}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                >
                    <Label
                        value={props.value}
                        position="center"
                        fontSize={16}
                    />
                    {
                        props.data.map((entry, index) => <Cell key={`cell-${index}`}
                                                               fill={COLORS[index % COLORS.length]}
                        />)
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default SkillChart;