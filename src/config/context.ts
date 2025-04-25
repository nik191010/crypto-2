import React from 'react';

interface MyContextType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setSearch: (search: string) => void;
}

const AppContext = React.createContext<MyContextType | null>(null);

export default AppContext;
