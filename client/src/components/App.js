import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';

function App() {
  return (
    <div>
      {/* <header className='App-header'>
      </header> */}
      <Switch>
      <Route exact path ='/' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
