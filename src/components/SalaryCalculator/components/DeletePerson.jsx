import { useContext } from 'react';

import { Button } from '@/components/shadcn/button'
import { Trash } from 'lucide-react';

import { HouseholdSalaryContext } from '../../HouseholdSalaryCalculator';

const DeletePerson = () => {
  const { deleteActivePerson } = useContext(HouseholdSalaryContext);

  return (
    <>
      <Button size='icon' onClick={() => { deleteActivePerson(); }}>
        <Trash />
      </Button>
    </>
  );
}

export default DeletePerson;