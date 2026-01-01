import { MemoProvider } from './contexts/MemoContext';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MemoEditor from './components/MemoEditor/MemoEditor';
import './App.css';

function App() {
  return (
    <MemoProvider>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="app-main">
            <MemoEditor />
          </main>
        </div>
      </div>
    </MemoProvider>
  );
}

export default App;
