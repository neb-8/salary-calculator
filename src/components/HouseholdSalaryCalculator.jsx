import { createContext, useState, useMemo, useEffect } from 'react';

import FamilyMemberTabs from './FamilyMemberTabs/FamilyMemberTabs';
import HouseholdSummary from './HouseholdSummary/HouseholdSummary';
import SalaryCalculator from './SalaryCalculator/SalaryCalculator';

export const HouseholdSalaryContext = createContext(undefined);

const HouseholdSalaryCalculator = () => {
  const starterGross = {
    0: {
      name: 'Személy 1',
      gross: 0,
      szja: false,
      newlyWed: undefined,
      personalTaxBreak: false,
      dependents: 0,
      beneficiaries: 0,
    }
  };

  const starterNet = {
    0: {
      name: starterGross[0].name,
      net: starterGross[0].gross
    }
  }

  const [grossPerPerson, setGrossPerPerson] = useState(starterGross);

  const [netPerPerson, setNetPerPerson] = useState(starterNet);

  const calculateNet = () => {
    Object.keys(grossPerPerson).forEach(id => {
      let netTmp = grossPerPerson[id].gross * 0.815; //TB
      let tax = grossPerPerson[id].gross * 0.185;
      let szja = 0;
      let personalTaxBreak = 0;
      let newlyWed = 0;
      let beneficiaries = 0;
      if (!grossPerPerson[id].szja) { //ha elmúlt 25
        szja = -grossPerPerson[id].gross * 0.15;
        tax += -szja;
      } else if (grossPerPerson.gross > 499952) { //ha nincs 25 de sok
        szja = -(grossPerPerson.gross - 499952) * 0.15
        tax += -szja;
      }
      if (grossPerPerson[id].personalTaxBreak) {
        if (tax < 77300) {
          personalTaxBreak = tax;
        } else {
          personalTaxBreak = 77300;
        }
      }
      if (grossPerPerson[id].newlyWed) {
        newlyWed = 5000;
      }
      switch (grossPerPerson[id].beneficiaries) {
        case 0: {
          beneficiaries = 0;
          break;
        }
        case 1: {
          beneficiaries = grossPerPerson[id].dependents * 10000;
          break;
        }
        case 2: {
          beneficiaries = grossPerPerson[id].dependents * 20000;
          break;
        }
        default: {
          beneficiaries = grossPerPerson[id].dependents * 33000;
        }
      }
      netTmp = netTmp + szja + personalTaxBreak + newlyWed + beneficiaries;
      if(isNaN(netTmp)){
        netTmp = 0;
      }else{
        netTmp = parseInt(netTmp);
      }
      setNetPerPerson({ ...netPerPerson, [id]: { name: netPerPerson[id].name, net: netTmp } });

    });
  };

  const setActiveSzja = (value) => {
    grossPerPerson[activePersonId].szja = value;
    calculateNet();
  };

  const setActiveNewlyWed = (value) => {
    grossPerPerson[activePersonId].newlyWed = value;
    calculateNet();
  };

  const setActivePersonalTaxBreak = (value) => {
    grossPerPerson[activePersonId].personalTaxBreak = value;
    calculateNet();
  };

  const setActiveDependents = (value) => {
    grossPerPerson[activePersonId].dependents = value;
    calculateNet();
  };

  const setActiveBeneficiaries = (value) => {
    grossPerPerson[activePersonId].beneficiaries = value;
    calculateNet();
  };


  const [activePersonId, setActivePersonId] = useState(0);

  const activePersonInfo = useMemo(() => {
    //console.table(grossPerPerson[activePersonId])
    return grossPerPerson[activePersonId];
  }, [activePersonId, grossPerPerson]);


  const setGrossHandler = (id, nameStr, grossNum) => {
    setGrossPerPerson({
      ...grossPerPerson,
      [id]: {
        name: nameStr,
        // gross: Math.round((grossNum + Number.EPSILON) * 100) / 100
        gross: parseInt(grossNum),
        szja: activePersonInfo.szja,
        newlyWed: activePersonInfo.newlyWed,
        personalTaxBreak: activePersonInfo.personalTaxBreak,
        dependents: activePersonInfo.dependents,
        beneficiaries: activePersonInfo.beneficiaries,
      }
    });

    setNetPerPerson({
      ...netPerPerson,
      [id]: {
        name: nameStr,
        net: netPerPerson[id].net
      }
    });
  }

  useEffect(() => {
    calculateNet();
  }, [grossPerPerson]);


  const deleteActivePerson = () => {
    if (Object.keys(grossPerPerson).length > 1) {
      delete grossPerPerson[activePersonId];
      delete netPerPerson[activePersonId];
      setActivePersonId(Object.keys(grossPerPerson)[0]);
    } else if (Object.keys(grossPerPerson).length == 1) {
      setGrossPerPerson(starterGross);
      setNetPerPerson(starterNet);
      setActivePersonId(0);
    }
  }

  return (
    <HouseholdSalaryContext.Provider
      value={{
        netPerPerson,
        grossPerPerson,
        setGrossHandler,
        activePersonId,
        setActivePersonId,
        activePersonInfo,
        deleteActivePerson,
        setActiveSzja,
        setActiveNewlyWed,
        setActivePersonalTaxBreak,
        setActiveDependents,
        setActiveBeneficiaries,
      }}
    >
      <div className='bg-foreground text-background items-center flex flex-col min-w-screen w-full min-h-screen h-full'>
        <header className='w-[600px] xl:w-[1200px] py-2'>
          <FamilyMemberTabs />
        </header>
        <main className='flex h-auto gap-4 justify-center flex-wrap w-[600px] xl:w-[1200px]'>
          <SalaryCalculator />
          <HouseholdSummary />
        </main>
      </div>

    </HouseholdSalaryContext.Provider>
  );
};

export default HouseholdSalaryCalculator;
