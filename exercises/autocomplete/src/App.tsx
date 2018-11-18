import React from 'react';
import './App.css';
import { string } from 'prop-types';

interface IAppProps {
  name: string;
}

const App: React.SFC<IAppProps> = ({ name }) => (
  <div className="App">
    <h1>A Typescript React App by {name}</h1>
  </div>
);

export default App;
