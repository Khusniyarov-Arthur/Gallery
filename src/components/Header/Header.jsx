import style from './Header.module.css';
import Layout from '../Layout';
import Logo from './Logo';
import Auth from './Auth';


export const Header = () => {
  return (
    <header className={style.header}>
      <Layout >
        <div className={style.container}>
          <Logo />
          <Auth />
        </div>
      </Layout>
    </header>
  );
};
