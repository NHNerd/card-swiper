import React from 'react';

import Lists from '../../components/list/List';
import ForkLoL from './components/ForkLoL';

import cssLoL from './LoL.module.css';

type Props = {};
interface DataItem {
  id: number;
  name: string;
}

export default function LoL({}: Props) {
  console.log('Lol');
  const [data, setData] = React.useState<string[] | null>(null);
  const [listNames, setlistNames] = React.useState<string[] | null>(null);
  React.useEffect(() => {
    fetch('/temp/data-example/data.json')
      .then((response) => response.json())
      .then((fetchedData) => {
        if (JSON.stringify(fetchedData) !== JSON.stringify(data)) {
          setData(fetchedData);
          setlistNames(Object.keys(fetchedData.lists));
        }
      })
      .catch((error) => console.error('Error loading the data:', error));
  }, []);

  if (!listNames) {
    return <div>Загрузка...</div>;
  }

  return (
    <div id={cssLoL.container}>
      <ForkLoL />
      {listNames.map((listName, index) => (
        <Lists key={index}>{listName}</Lists>
      ))}
    </div>
  );
}
