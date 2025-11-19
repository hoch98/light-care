import './App.css';
import { Provider } from './components/ui/provider';
import { LightMode } from './components/ui/color-mode';
import Showoff from './sections/Showoff';
import LightCare from './sections/LightCare';
import Starter from './sections/Starter';

function App() {

  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default" }}>
          <Starter/>
          <LightCare />
          <Showoff />
        </div>
      </LightMode>
    </Provider>
  )
}


export default App
