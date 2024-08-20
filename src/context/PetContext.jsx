import React, { createContext, useState } from 'react';

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [selectedPetId, setSelectedPetId] = useState(localStorage.getItem('selectedPetId') || '');
  const [selectedPetName, setSelectedPetName] = useState(localStorage.getItem('selectedPetName') || '');

  return (
    <PetContext.Provider value={{ selectedPetId, setSelectedPetId, selectedPetName, setSelectedPetName }}>
      {children}
    </PetContext.Provider>
  );
};
