import './styles.scss';
import { HashRouter as Router } from 'react-router-dom';
import Store from './store/store';
import ReactDOM from 'react-dom';
import { createContext } from 'react';
import App from './App';


interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

ReactDOM.render(
    <Context.Provider value={{store}}>
      <Router>
        <App />
      </Router>
    </Context.Provider>,
  document.getElementById('root')
)
