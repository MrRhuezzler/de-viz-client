import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Navigator from './Navigator';

export default function App() {
  return (
    <BrowserRouter>
      <Navigator />
    </BrowserRouter>
  )
}

