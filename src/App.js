import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import ViewPhoto from './components/ViewPhoto';

function App() {
  return (
    <Routes>
      <>
        <Route path='*' element={
          <>
            <Header />
            <Main />
          </>
        }/>
        <Route path='/photo/:id' element={<ViewPhoto />}/>
      </>
    </Routes>
  );
}

export default App;
