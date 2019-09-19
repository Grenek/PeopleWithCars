import React from 'react';
import '../styles/style.scss';
import axios from 'axios';
import { PieChart, Pie, Sector, Tooltip } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class Statistics extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }
  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  componentDidMount() {
    this.getStatistics()
  }

  getStatistics() {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/statistics')
      .then(response => {
        this.setState({ ...response.data })
        console.log(response.data)
      })
  }

  render() {
    let data = [
      { name: 'Количество владельцев', value: this.state.personcount },
      { name: 'Количество машин', value: this.state.carcount },
      { name: 'Количество уникальных машин', value: this.state.uniquevendorcount },
    ];
    return (
      <div>
        <h1>Количество овнеров: {this.state.personcount}</h1>
        <h1>
          Количество машин: {this.state.carcount}
        </h1>
        <h1>
          Количество уникальных машин: {this.state.uniquevendorcount}
        </h1>
        <PieChart width={400} height={400}>
        <Pie nameKey="name" dataKey="value" isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
      </div>
    )
  }
}

export default Statistics;