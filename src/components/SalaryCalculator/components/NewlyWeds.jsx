import { useState, useContext } from 'react';

import { Switch } from '@/components/shadcn/switch';
import { Input } from '@/components/shadcn/input';

import { NewlyWedsValidity } from './';

import { HouseholdSalaryContext } from '../../HouseholdSalaryCalculator';

const NewlyWeds = () => {
  const { setActiveNewlyWed } = new useContext(HouseholdSalaryContext);

  const [newlyWed, setNewlyWed] = useState(false);
  const [date, setDate] = useState(0);

  const switchHandler = (e) => {
    setNewlyWed(e);
    if (!e) {
      setDate(0);
      setActiveNewlyWed(undefined);
    }
  }

  return (
    <div className='gap-2 flex h-8 items-center'>
      <Switch onCheckedChange={(e) => { switchHandler(e) }} />
      <p className='content-center'>Friss Házasok kedvezménye</p>
      {newlyWed ?
        <Input type='date' className='h-8 w-34 px-2 py-1' onInput={(e) => setDate(e.target.valueAsNumber)} />
        : ''}
      {(date != 0 && newlyWed) ?
        <NewlyWedsValidity date={date} />
        : ''}
    </div>
  );
}

export default NewlyWeds;