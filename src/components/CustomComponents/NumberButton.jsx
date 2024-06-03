import { Button } from '@/components/shadcn/button';

import { Plus, Minus } from 'lucide-react';

const NumberButton = ({ type, valueSetter }) => {
  const className = `
    h-4
    w-4
    p-0
    rounded-full
    m-1
  `;

  return (
    <>
      {type == 'plus' || type == 'minus' ?
        <Button type='button' className={className} onClick={() => valueSetter()}>
          {type == 'plus' ? <Plus /> : <Minus />}
        </Button>
        : ''
      }
    </>
  );
}

export default NumberButton;