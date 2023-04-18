import style from './Massege.module.css';
import ReactDOM from 'react-dom';

export const Massege = () => {
  return ReactDOM.createPortal(
    <span className={style.message}>Необходимо авторизоваться</span>,
    document.getElementById('massage')
  );
};
