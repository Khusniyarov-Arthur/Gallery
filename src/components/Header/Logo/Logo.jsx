import {Link} from 'react-router-dom';
import style from './Logo.module.css';
import {ReactComponent as LogoIcon} from './img/logo.svg';

export const Logo = () => {
  return (
    <Link className={style.link} to='/'>
      <LogoIcon className={style.link} alt="Логотип Gallery"/>
    </Link>
  );
};
