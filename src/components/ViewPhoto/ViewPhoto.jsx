import style from './ViewPhoto.module.css';
import Layout from '../Layout';
import Like from '../Main/List/Card/Like';
import Author from '../Main/List/Card/Author';
import Date from '../Main/List/Card/Date';
import Header from '../Header';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getPhotoRequestAsing} from '../../store/getPhoto/actionGetPhoto';
import {delPhoto} from '../../store/getPhoto/actionGetPhoto';
import {Loader} from '../../UI/Loader';

export const ViewPhoto = () => {
  const card = useSelector(state => state.getPhotoReducer.photo);
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPhotoRequestAsing(id));
    return () => {
      dispatch(delPhoto());
    };
  }, []);


  return (
    <>
      <Header/>
      <div className={style.wrap}>
        {!card.regular ? <Loader /> : (<Layout >
          <img className={style.imgHight} src={card.regular} alt='photo'/>
          <div className={style.wrapBar}>
            <Like count={[card.countLikes, card.liked, id]}/>
            <Author author={[card.name, card.link]}/>
            <button onClick={() => navigate(-1)} className={style.btnBack}
            >
              <span className={style.link}>
                Назад
              </span>
              {/* <Link className={style.link} to='/'>
                Назад
              </Link> */}
            </button>
            <Date date={card.created}/>
          </div>
        </Layout>)}
      </div>
    </>
  );
};


