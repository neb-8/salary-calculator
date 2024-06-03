import { useContext } from 'react';

import { Button } from '@/components/shadcn/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

import { HouseholdSalaryContext } from '../HouseholdSalaryCalculator';
import {
  GrossSetters,
  Dependents,
  NewlyWeds,
  Szja,
  PersonalTaxBreak,
  DeletePerson
} from './components';
import {
  InputField
} from '../CustomComponents';

const SalaryCalculator = () => {
  const { activePersonId, setGrossHandler, activePersonInfo, netPerPerson } = useContext(HouseholdSalaryContext);

  const formattedNet = isNaN(activePersonInfo?.gross) ? 0 : activePersonInfo?.gross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Card className='xl:w-[calc(50%-0.5rem)] w-full pb-8'>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          {activePersonInfo?.name} bérének adatai
          <DeletePerson />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <InputField
                label='Családtag neve'
                inputId='name'
                inputType='text'
                value={activePersonInfo?.name}
                onInputAction={(e) => { setGrossHandler(activePersonId, e.target.value, activePersonInfo.gross); }}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <InputField
                label='Bruttó bér'
                inputId='gross'
                inputType='number'
                value={activePersonInfo?.gross}
                onInputAction={(e) => { setGrossHandler(activePersonId, activePersonInfo.name, e.target.value) }}
              />
            </div>
            <GrossSetters />
            <Dependents />
            <NewlyWeds />
            <Szja />
            <PersonalTaxBreak />
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col items-center mt-12 gap-2'>
        Nettó bér:
        <Button disabled>{netPerPerson[activePersonId].net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Ft</Button>
      </CardFooter>
    </Card>
  );
};

export default SalaryCalculator;
