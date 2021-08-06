import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import About from './About';

function App() {
  return (
    <div>
      {/* <header className='App-header'>
      </header> */}
      <Switch>
      <Route exact path ='/' component={Home}/>
      <Route path ='/about' component={About}/>
      </Switch>
    </div>
  );
}

export default App;
