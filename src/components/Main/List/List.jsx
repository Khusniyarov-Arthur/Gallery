import style from './List.module.css';
import Card from './Card';
import Masonry from 'react-masonry-css';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {
  getPhotosRequestAsing,
} from '../../../store/getPhotos/actionGetPhotos';
import {Loader} from '../../../UI/Loader';
import {Massege} from '../../Massege/Massege';

export const List = () => {
  const endList = useRef(null);
  const page = useSelector(state => state.getPhotosReducer.page);
  const dispatch = useDispatch();
  const cards = useSelector(state => state.getPhotosReducer.data);
  const limitMess = useSelector(state => state.getPhotosReducer.limitMess);
  const [massage, setMassage] = useState(false);

  useEffect(() => {
    limitMess ? setMassage(true) : setMassage(false);
  });


  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  useEffect(() => {
    if (cards.length > 0) return;
    dispatch(getPhotosRequestAsing());
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (page > 1 && cards.length > 0) {
          dispatch(getPhotosRequestAsing());
        }
      }
    }, {
      rootMargin: '50px',
    });

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  return (
    <>
      {cards.length === 0 ?
      (<div className={style.loder}>
        <Loader />
        {massage && <Massege />}
      </div>) :
      (<ul>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={style.mymasonrygrid}
          columnClassName={style.mymasonrygridcolumn}>
          {cards.map((item) => (
            <div key={item.id}>
              <Card dataCard={item} />
            </div>
          ))}
        </Masonry>
      </ul>)
      }
      <li ref={endList} className={style.end}/>
    </>
  );
};
