import { NumberButton } from './';

const SmallNumberComponent = ({ value, setter }) => {
  // const [value, setValue] = useState(0);

  return (
    <div className='flex items-center bg-secondary rounded-full'>
      <NumberButton type='minus' valueSetter={() => setter(value - 1)} />
      {value}
      <NumberButton type='plus' valueSetter={() => setter(value + 1)} />
    </div>
  );
}

export default SmallNumberComponent;