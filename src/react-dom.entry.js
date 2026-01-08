import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';

// Junta ReactDOM + ReactDOMClient num único objeto global (ReactDOM.createRoot etc.)
const ReactDOMCombined = { ...ReactDOM, ...ReactDOMClient };

// window.ReactDOM = { ... }
export default ReactDOMCombined;
