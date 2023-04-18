import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import PropTypes from 'prop-types';
import {urlAuth} from '../../../api/auth';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteToken,
  tokenRequestAsing,
  updateToken,
} from '../../../store/tokenReducer';
import {getToken} from '../../../api/token';
import {authRequestAsing, getAuth} from '../../../store/Auth/authReducer';

export const Auth = () => {
  const [logout, setLogout] = useState(false);
  const token = useSelector(state => state.tokenReducer.token);
  const auth = useSelector(state => state.authReducer.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.search.includes('?code') && !localStorage.getItem('bearer')) {
      dispatch(tokenRequestAsing());
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('bearer')) {
      dispatch(updateToken(getToken()));
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem('bearer') && !localStorage.getItem('user')) {
      dispatch(authRequestAsing());
    }

    if (localStorage.getItem('user')) {
      dispatch(getAuth(localStorage.getItem('user')));
    }
  }, [token]);

  const exit = () => {
    dispatch(deleteToken());
    localStorage.clear('bearer');
  };
  return (
    <div className={style.wrap}>
      <div className={style.wrapBtn}>
        {token ?
        <button className={style.btn} onClick={(e) => {
          e.preventDefault();
          setLogout(!logout);
        }}>{auth}
          <div className={style.logout}
            onClick={(e) => {
              e.preventDefault();
              exit();
              setLogout(false);
            }}>Выйти
          </div>
        </button> :
        <a href={urlAuth}><LoginIcon alt="Авторизация"/></a>
        }
      </div>
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
};
