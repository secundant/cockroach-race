import * as model from '../model';
import { useStore, useEvent } from 'effector-react';
import { memo } from 'react';

export const TeamView = memo(() => {
  const counter = useStore(model.$counter);
  const decrement = useEvent(model.decrement);
  const increment = useEvent(model.increment);

  return (
    <>
      <h3 className="mb-4">Count: {counter}</h3>
      <div>
        <button className="mr-4" onClick={decrement} disabled={counter === 0}>
          Decrement
        </button>
        <button onClick={increment}>Increment</button>
      </div>
    </>
  );
});
