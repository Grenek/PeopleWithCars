import React from 'react';
import '../styles/style.scss';
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import apiConfig from '../apiConfig'

class Statistics extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    this.getStatistics()
  }

  getStatistics() {
    axios
      .get(`${apiConfig.url}/statistics`)
      .then(response => {
        this.setState({ ...response.data })
      })
  }

  render() {
    let data = [
      { name: `Количество пользователей зарегистрированных в системе: ${this.state.personcount}`, value: this.state.personcount },
      {
        name: `Общее количество авто: ${this.state.carcount}. 
      Из них в автопарке пользователей: ${this.state.uniquevendorcount}`, value: this.state.carcount
      },
    ];

    const COLORS = ['#007bff', '#FFC300', '#FFBB28', '#FF8042'];
    return (
      <div>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index
              }) => {
                const RADIAN = Math.PI / 180;
                // eslint-disable-next-line
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                // eslint-disable-next-line
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                // eslint-disable-next-line
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#000"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {data[index].name}
                  </text>
                )
              }}
            >
              {
                data.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default Statistics;