import React from 'react';
import ReactDOM from 'react-dom';
import { ChromeOptionsPanel } from './components/chrome/options/ChromeOptionsPanel';

import 'bootstrap/dist/css/bootstrap.css';
import './css/options.css';

ReactDOM.render(
  <ChromeOptionsPanel />,
  document.getElementById("root")
);
