import { useContext } from 'react';

import { Switch } from '@/components/shadcn/switch';

import { HouseholdSalaryContext } from '../../HouseholdSalaryCalculator';

const PersonalTaxBreak = () => {
  const { setActivePersonalTaxBreak } = useContext(HouseholdSalaryContext);

  return (
    <div className='gap-2 flex h-8 items-center'>
      <Switch onCheckedChange={(e) => setActivePersonalTaxBreak(e)} />
      <p className='content-center'>Személyi adókedvezmény </p>
    </div>
  );
}

export default PersonalTaxBreak;