import { useContext, useEffect, useState } from 'react';

import { Badge } from '@/components/shadcn/badge'

import { HouseholdSalaryContext } from '../../HouseholdSalaryCalculator';

const NewlyWedsValidity = ({ date }) => {
  const { setActiveNewlyWed, activePersonInfo } = new useContext(HouseholdSalaryContext);
  const [isValid, setisValid] = useState(false);
  const DAY_VALUE = 1000 * 60 * 60 * 24
  const TWO_YEAR_VALUE = DAY_VALUE * 365 * 2;
  const ONE_MONTH_VALUE = DAY_VALUE * 30;

  useEffect(() => {
    if (!date || date == 0) {
      setActiveNewlyWed(false);
    }
    const diference = new Date().getTime() - date;
    const validTmp = (diference > ONE_MONTH_VALUE && diference < TWO_YEAR_VALUE);
    setisValid(validTmp);
    setActiveNewlyWed(validTmp);
  }, [date, activePersonInfo]);


  let renderBadge = <Badge className='h-6' variant='destructive'>Nem Jogosult</Badge>;
  if (isValid) {
    renderBadge = <Badge className='h-6 bg-green-600 hover:bg-green-600/80'>Jogosult</Badge>;
  }


  return (
    <>
      {renderBadge}
    </>
  );
}

export default NewlyWedsValidity;