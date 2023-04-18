import List from './List';
import Layout from '../Layout';
import style from './Main.module.css';
import {Route, Routes} from 'react-router-dom';

export const Main = () => {
  return (
    <main className={style.wrap}>
      <Layout >
        <Routes>
          <Route path='*' element={
            <List />
          }>
          </Route>
        </Routes>
      </Layout>
    </main>
  );
};
