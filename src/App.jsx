import './App.css';
import { Provider } from './components/ui/provider';
import { LightMode } from './components/ui/color-mode';
import LightCare from './sections/LightCare';
import Starter from './sections/Starter';
import Research from './sections/Research';
import Team from './sections/Team';
import Specification from './sections/Specification';
import LookingAhead from './sections/LookingAhead';

function App() {

  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default" }}>
          <Starter/>
          <LightCare />
          <Specification />
          <Team />
          <Research />
          <LookingAhead />
        </div>
      </LightMode>
    </Provider>
  )
}


export default App
