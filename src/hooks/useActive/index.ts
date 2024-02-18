import {useState, useEffect} from 'react';

function useActive(strings: string[]): boolean {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const hasEmptyString = strings.some(str => str === '');
    setIsActive(!hasEmptyString);
  }, [strings]);

  useEffect(() => {
    const prevStrings = JSON.stringify(strings);
    return () => {
      const curStrings = JSON.stringify(strings);
      if (curStrings !== prevStrings) {
        const hasEmptyString = strings.some(str => str === '');
        setIsActive(!hasEmptyString);
      }
    };
  }, [strings]);

  return isActive;
}

export default useActive;
