import { useContext } from 'react';

import { Switch } from '@/components/shadcn/switch';

import { HouseholdSalaryContext } from '../../HouseholdSalaryCalculator';

const Szja = () => {
  const { setActiveSzja } = new useContext(HouseholdSalaryContext);

  return (
    <div className='gap-2 flex h-8 items-center'>
      <Switch onCheckedChange={(e) => setActiveSzja(e)} />
      <p className='content-center'>25 éven aluliak SZJA kedvezménye</p>
    </div>
  );
}

export default Szja;