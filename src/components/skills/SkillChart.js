import React from 'react';
import {
    PieChart, Pie, Cell, Label, ResponsiveContainer
} from 'recharts';

const COLORS = ['#6e6e6e', '#2a2a2a'];


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
                    stroke="#000000"
                    paddingAngle={0}
                    dataKey="value"
                >
                    <Label
                        value={props.value}
                        position="center"
                        fontSize={16}
                        stroke="#FF0100"
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