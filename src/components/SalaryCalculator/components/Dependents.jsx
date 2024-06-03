import { useState, useContext } from 'react';

import { HouseholdSalaryContext } from '../../HouseholdSalaryCalculator';

import { SmallNumberComponent } from '../../CustomComponents';

const Dependents = () => {
  const { setActiveDependents, setActiveBeneficiaries } = new useContext(HouseholdSalaryContext);

  const [dependents, setDependents] = useState(0);
  const [beneficiaries, setBeneficiaries] = useState(0);

  const setDependentsHandler = (value) => {
    if (value >= 0) {
      setDependents(value);
      setActiveDependents(value);
      if (value <= beneficiaries) {
        setBeneficiaries(value);
        setActiveBeneficiaries(value);
      }
    }
  }

  const setBeneficiariesHandler = (value) => {
    if (value >= 0 && value <= dependents && value <= 3) {
      setBeneficiaries(value);
      setActiveBeneficiaries(value);
    }
  }

  return (
    <div className='gap-2 flex h-8 content-center'>
      <p className='content-center'>Eltartottak:</p>
      <SmallNumberComponent value={dependents} setter={setDependentsHandler} />
      {/* <Input className='h-8 w-14 px-2 py-1' type='number' value={dependents} onInput={(e) => setDepAndBen('dep', e.target.value)} /> */}
      <p className='content-center'>ebből kezdvezményezett:</p>
      <SmallNumberComponent value={beneficiaries} setter={setBeneficiariesHandler} />
      {/* <Input className='h-8 w-14 px-2 py-1' type='number' value={beneficiaries} onInput={(e) => setDepAndBen('ben', e.target.value)} /> */}
    </div>
  );
}

export default Dependents;