import {Routes , Route} from 'react-router-dom'
import Join from './Components/Join/Join';
import Chat from './Components/Chat/Chat';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Join />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
