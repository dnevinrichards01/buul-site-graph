import {useState, useMemo} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import CustomSlider from "./Slider.tsx"
import { Tooltip as ReactTooltip} from 'react-tooltip';
import { FiInfo } from "react-icons/fi";
import "../styles/main.css"
import "../styles/Graph.css"

type LineDataParams = {
  monthlySpend?: number;
  numYears?: number;
  cashbackRate1?: number;
  cashbackRate2?: number;
  growthRate1?: number;
  growthRate2?: number;
  _yearNow?: number;
};


const Graph = () => {

    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
    // const secondaryColor = rootStyles.getPropertyValue('--secondary-color').trim();

    const [monthlySpend, setMonthlySpend] = useState(2000);
    const [yearNow] = useState(() => new Date().getFullYear());
    const generateLineData = ({
      monthlySpend=2200, 
      numYears=40, 
      cashbackRate1=0.046,
      cashbackRate2=0.015,
      growthRate1=1.12,
      growthRate2=1.0,
      _yearNow = yearNow
    }: LineDataParams) => {
      console.log("generating")
      const res = [];
  
      let exponential = monthlySpend * cashbackRate1;
      let constant = monthlySpend * cashbackRate2;
      for (let i = 0; i < numYears; ++i) {
          const year = _yearNow + i;
          exponential = monthlySpend * cashbackRate1 * 12 + (exponential * growthRate1);
          constant = monthlySpend * cashbackRate2 * 12 + (constant * growthRate2);
          res.push({
              year,
              exponential,
              constant
          });
      }
      console.log("completed")
  
      return res;
    }
    const props = {
      monthlySpend: monthlySpend, 
      numYears: 40, 
      cashbackRate1: 0.046,
      cashbackRate2: 0.015, 
      growthRate1: 1.12, 
      growthRate2: 1.0, 
      _yearNow: yearNow
    }
    const data = useMemo(() => {
      return generateLineData(props)
    }, [yearNow, monthlySpend])
    const xTicks: number[] = useMemo(() => {
      return Array.from({length: 8}, (_, i) => 5*i + yearNow)
    }, [yearNow])
    const xDomain: number[] = useMemo(() => {
      return [yearNow, yearNow+40]
    }, [yearNow])

    const handleChange = (e: number | number[]) => {
        if (typeof e != 'number') {
          return;
        }
        setMonthlySpend(e)
    }
    const CustomTooltip = (props: {
      active?: boolean;
      payload?: {payload?: {year: number}, name: string, color: string, value: number}[];
      label?: any;
    }) => {
      const {active, payload} = props;
        if (active && payload && payload.length) {
            const year = payload[0]?.payload?.year;
            return (
                <div className="custom-tooltip" style={{'pointerEvents': 'none'}}>
                    <p style={{'color': 'white'}}>Year: {year}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {`$${Math.floor(entry.value/1000)}K`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{'width':'100%', 'display':'flex', 'alignItems':'center', 
          'flexDirection':'column', 'justifyContent':'space-between','height':'100%'}}>
            <ResponsiveContainer height='80%'>
                <LineChart 
                  data={data} 
                  margin={{ top: 0, right: 30, left: 5, bottom: 0 }}
                >
                    <CartesianGrid vertical={false} horizontal={false} />
                    <XAxis 
                        dataKey="year" 
                        domain={xDomain} 
                        ticks={xTicks} 
                        padding={{ left: 5, right: 0 }}
                        tick={{ fontSize: '.6em'}}
                        minTickGap={1.5}
                        allowDataOverflow={false}
                    />
                    <YAxis 
                        tickFormatter={(usd) => `$${Math.floor(usd / 1000)}K`} 
                        domain={[0,2500000]} 
                        ticks={[0, 250000, 500000, 750000, 1000000, 1250000, 1500000, 1750000, 2000000, 2250000, 2500000]} 
                        tick={{ fontSize: '.6em'}}
                        padding={{ top: 5, bottom: 5 }} 
                        allowDataOverflow={false}
                        allowDecimals={false}
                    />
                    <Tooltip 
                      content={<CustomTooltip/>} 
                      position={{ x: 75, y: 10 }}
                      isAnimationActive={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="exponential" 
                      name="With Buul" 
                      stroke={primaryColor}
                      dot={false} 
                      strokeWidth={3}
                      animationDuration={300}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="constant" 
                      name="Without Buul" 
                      stroke="#ffffff"
                      dot={false} 
                      strokeWidth={3}
                      animationDuration={300}
                    />
                </LineChart>
            </ResponsiveContainer>
            <div className='rechart-slider'>
                <div style={{'display':'flex',
                  'justifyContent':'space-between', 
                  'fontSize':'1em','gap':'10px'
                }}>
                    <p>How much do you spend each month?</p>
                    <p>${monthlySpend}</p>
                </div>
                <div style={{'display':'flex', 'flexDirection':'row', 'justifyContent':'space-between'}}>
                  <CustomSlider 
                      min={0} 
                      max={5000} 
                      step={1} 
                      initialValue={monthlySpend}
                      sliderHandleChange={handleChange}
                  />
                  <FiInfo data-tooltip-id="custom-tooltip" />
                  <ReactTooltip id="custom-tooltip" place='right'>
                      <div className='tooltiptext'> 
                          With Buul:
                          <ul>
                              <li>4.6% cashback rate</li>
                              <li>12% annualized returns in S&P 500</li>
                          </ul>
                          Without Buul:
                          <ul>
                              <li>1.5% cashback</li>
                              <li>No investment of cashback</li>
                          </ul>
                      </div>
                  </ReactTooltip>
                </div>
            </div>
        </div>
    )
};
        
export default Graph;
