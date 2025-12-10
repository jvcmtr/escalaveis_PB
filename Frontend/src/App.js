import './App.css';
import Routing from './Routes';
import { RESTProvider } from './services/API/RESTContext';
import { NotificationProvider } from './services/NotificationService';
import { UserProvider } from './services/UserContext';

function App() {
  return (
    <div className="App">
      <RESTProvider>
        <UserProvider>
          <NotificationProvider>
            <Routing/>
          </NotificationProvider>
        </UserProvider>
      </RESTProvider>
    </div>
  );
}

export default App;
