import { useContext } from 'react';

import { HouseholdSalaryContext } from '../HouseholdSalaryCalculator';

import { Button } from '@/components/shadcn/button'
import { Plus } from 'lucide-react';

const FamilyMemberTabs = () => {
  const { activePersonId, setActivePersonId, setGrossHandler, grossPerPerson } = useContext(HouseholdSalaryContext);

  const addPerson = () => {
    const listLength = Object.keys(grossPerPerson).length;
    setGrossHandler(listLength, 'Személy ' + (1 + listLength), 0);
  }


  return (
    <div className='h-min flex flex-wrap w-full'>
      {Object.keys(grossPerPerson).map(id => {
        if (id == activePersonId) {
          return (
            <Button className='top-0' key={id} variant='secondary' disabled >
              {grossPerPerson[id].name}
            </Button>
          );
        }
        return (
          <Button key={id} onClick={() => setActivePersonId(id)}>
            {grossPerPerson[id].name}
          </Button>
        );
      })}
      <Button size='icon' key='plus' onClick={() => addPerson()}>
        <Plus />
      </Button>
    </div>
  );
};

export default FamilyMemberTabs;
