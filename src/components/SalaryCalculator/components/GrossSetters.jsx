import { useContext, useMemo } from 'react';

import { HouseholdSalaryContext } from '../../HouseholdSalaryCalculator';

import { Slider } from '@/components/shadcn/slider'
import { Button } from '@/components/shadcn/button'

const GrossSetters = () => {
  const { activePersonId, setGrossHandler, activePersonInfo } = useContext(HouseholdSalaryContext);

  const buttonValues = [-5, -1, 1, 5];

  const responseiveValue = useMemo(() => {
    console.log(isNaN(activePersonInfo?.gross) ? 0 : activePersonInfo?.gross);
    return isNaN(activePersonInfo?.gross) ? 0 : activePersonInfo?.gross;
  }, [activePersonInfo]);


  return (
    <>
      <Slider
        defaultValue={[responseiveValue]}
        max={1000000}
        step={1}
        value={[responseiveValue]}
        onValueChange={(e) => { setGrossHandler(activePersonId, activePersonInfo.name, ...e) }}
      />

      <div className='gap-4 flex h-auto justify-center'>
        {buttonValues.map(v => {
          return (
            <Button key={v} size='icon' type='button'
              onClick={() => setGrossHandler(activePersonId, activePersonInfo.name, activePersonInfo.gross * (100 + v) / 100)}>
              {v}%
            </Button >
          );
        })}
      </div>
    </>
  );
}

export default GrossSetters;