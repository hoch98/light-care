import './App.css';
import { Provider } from './components/ui/provider';
import { LightMode } from './components/ui/color-mode';
import LightCare from './sections/LightCare';
import Starter from './sections/Starter';
import Research from './sections/Research';
import Team from './sections/Team';

function App() {

  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default" }}>
          <Starter/>
          <LightCare />
          <Team />
          <Research />
        </div>
      </LightMode>
    </Provider>
  )
}


export default App
