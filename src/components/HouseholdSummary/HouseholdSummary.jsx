import { useContext, useMemo } from 'react';

import { HouseholdSalaryContext } from '../HouseholdSalaryCalculator';

import { Button } from '@/components/shadcn/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

const HouseholdSummary = () => {
  const { netPerPerson, setActivePersonId, grossPerPerson } = useContext(HouseholdSalaryContext);

  const netSum = useMemo(() => {
    let netTmp = 0;
    Object.keys(netPerPerson).forEach(id => {
      netTmp += netPerPerson[id].net;
    });
    return netTmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, [netPerPerson, grossPerPerson]);

  return (
    <>
      <Card className='xl:w-[calc(50%-0.5rem)] w-full pb-8 relative'>
        <CardHeader>
          <CardTitle>Háztartás jövedelme</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Háztartás tagja</TableHead>
                <TableHead>Nettó bér</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(netPerPerson).map(id => {
                return (
                  <TableRow key={id}>
                    <TableCell className='py-0'>
                      <Button variant='ghost' onClick={() => setActivePersonId(id)}>
                        {netPerPerson[id].name}
                      </Button>
                    </TableCell>
                    <TableCell className='py-0'>
                      {netPerPerson[id].net}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className='flex flex-col items-center mt-12'>
          Összesített nettó jövedelem:
          <Button disabled>{netSum} Ft</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default HouseholdSummary;
