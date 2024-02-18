import {ErrorObject} from 'config/Types';
import {Dispatch, SetStateAction} from 'react';

type setAllErrorsToFalseTypes = {
  errorArray: ErrorObject[];
  setIsError: Dispatch<SetStateAction<ErrorObject[]>>;
};

const setAllErrorsToFalse = ({
  errorArray,
  setIsError,
}: setAllErrorsToFalseTypes) => {
  const updatedErrors = errorArray.map(errorObject => ({
    ...errorObject,
    hasError: false,
  }));

  setIsError(updatedErrors);
};

export default setAllErrorsToFalse;
