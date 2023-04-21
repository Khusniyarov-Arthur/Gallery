import {useSelector} from 'react-redux';
import style from './Massege.module.css';
import ReactDOM from 'react-dom';

export const Massege = () => {
  const limitMess = useSelector(state => state.getPhotosReducer.limitMess);
  // console.log(limitMess, 'лог из мес');
  return ReactDOM.createPortal(
    <>
      {limitMess ?
        (<span className={style.message}>Превышен лимит запросов</span>) :
        (<span className={style.message}>Необходимо авторизоваться</span>)
      }
    </>,
    document.getElementById('massage')
  );
};
