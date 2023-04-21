import style from './Like.module.css';
import {Massege} from '../../../../Massege/Massege';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {likedRequestAsing} from '../../../../../store/getPhoto/actionGetPhoto';

export const Like = ({count}) => {
  const [countLikes, liked, id] = count;
  const [isliked, setIsLiked] = useState(liked);
  const [massage, setMassage] = useState(false);
  const token = useSelector(state => state.tokenReducer.token);
  const dispatch = useDispatch();


  const showMassege = () => {
    if (token) return;
    setMassage(true);
    setTimeout(() => setMassage(false), 3000);
  };

  const setLike = () => {
    showMassege();
    if (token) {
      setIsLiked(!isliked);
      dispatch(likedRequestAsing(id, isliked));
    }
  };

  useEffect(() => {
    if (!token) {
      setIsLiked(false);
    }
  }, [token]);

  return (
    <div className={style.countLike}>
      <button onClick={() => setLike()} className={style.btn}>
        {!isliked ?
          <svg className={style.like}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="white"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8C8.925 8 4 12.925 4 19C4
            30 17 40 24 42.326C31 40 44 30 44 19C44
            12.925 39.075 8 33 8C29.28 8 25.99 9.847
            24 12.674C22.9857 11.2292 21.6382 10.0501
            20.0715 9.23649C18.5049 8.42289 16.7653
            7.99875 15 8Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"/>
          </svg> :
          <svg className={style.like}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M34 9C29.8 9 26.1 11.1 24
            14.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4
            2 21C2 32.9 24 45 24 45C24 45 46 33 46
            21C46 14.4 40.6 9 34 9Z"
            fill="#F44336"/>
          </svg>}
      </button>
      <span className={style.counts}>{countLikes}</span>
      {massage && <Massege />}
    </div>
  );
};

Like.propTypes = {
  count: PropTypes.array,
};
