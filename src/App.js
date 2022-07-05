// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Game from './components/Game/Game';
import GameBrowser from './components/GameBrowser/GameBrowser';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
      <Route exact path="/">
        <GameBrowser/>
      </Route>
        <Route path="/game/:gameId/:username">
          <Game/>
        </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
