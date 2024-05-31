// src/FormContext.js
import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemShortName: '',
    description: '',
    notes: 'No notes field',
    category: 'None',
  });

  const [costsData, setCostsData] = useState({
    dueDateOption: 'no',
    costOption: 'Fixed amount',
    fixedAmount: '',
    variableAmount: '',
    defaultAmount: '',
    minimumAmount: '',
    maximumAmount: '',
    dueDate: '',
    bankAccount: '',
    addAccountingCodes: 'no',
});

const [quantityData, setQuantityData] = useState({
    limitedPlaces: 'no',
    numberOfPlaces: '',
    itemQuantityOption: 'no',
    itemQuantity: '',
    minQuantity: '',
    maxQuantity: '',
    itemSetupOption: 'Only once',
});

  return (
    <FormContext.Provider value={{ formData, setFormData, costsData, setCostsData, quantityData, setQuantityData }}>
      {children}
    </FormContext.Provider>
  );
};
