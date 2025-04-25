import React from 'react';
import { chartDays } from '../../config/data';

// Define the interface for chartDays items
interface ChartDay {
  label: string;
  value: string | number; // Assuming value can be string or number based on previous error
  format: string;
}

const Buttons: React.FC = () => {
  const [active, setActive] = React.useState<string | number | null>(null);

  // Sets active button
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const id = event.currentTarget.id;
    setActive(id);
  };

  const buttons = chartDays.map((day: ChartDay) => (
    <button
      key={String(day.value)}
      className={active === String(day.value) ? 'active' : undefined}
      id={String(day.value)}
      onClick={handleClick}>
      {day.label}
    </button>
  ));

  return <div>{buttons}</div>;
};

export default Buttons;
