import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type CustomSliderProps = {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  sliderHandleChange: (value: number | number[]) => void;
};

const CustomSlider: React.FC<CustomSliderProps> = ({
        min, 
        max, 
        step, 
        initialValue, 
        sliderHandleChange
    }) => {

    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
    const secondaryColor = rootStyles.getPropertyValue('--secondary-color').trim();

    return (
    <div style={{ width: '90%'}}>
        <Slider
            min={min}
            max={max}
            step={step}
            value={initialValue}
            onChange={sliderHandleChange}
            styles={{
                rail: { backgroundColor: '#ddd', height: 10 },
                track: { backgroundColor: `${primaryColor}`, height: 10 },
                handle: {
                    borderColor: `${primaryColor}`,
                    height: 20,
                    width: 20,
                    marginLeft: 0,
                    marginTop: -5,
                    backgroundColor: '#fff',
                    boxShadow: `${secondaryColor}`
                }
            }}
        />
    </div>
  );
};

export default CustomSlider;
