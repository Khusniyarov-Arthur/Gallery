import style from './List.module.css';
import Card from './Card';
import Masonry from 'react-masonry-css';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {
  // nextPage,
  getPhotosRequestAsing,
  // clearPhotos,
} from '../../../store/getPhotos/actionGetPhotos';
import {Loader} from '../../../UI/Loader';
import {Massege} from '../../Massege/Massege';

export const List = () => {
  const endList = useRef(null);
  const page = useSelector(state => state.getPhotosReducer.page);
  // const newPage = useSelector(state => state.getPhotosReducer.newPage);
  // const token = useSelector(state => state.tokenReducer.token);
  const dispatch = useDispatch();
  const cards = useSelector(state => state.getPhotosReducer.data);
  const limitMess = useSelector(state => state.getPhotosReducer.limitMess);
  const [massage, setMassage] = useState(false);
  // const showMassege = () => {
  //   // if (token) return;
  //   setMassage(true);
  //   setTimeout(() => setMassage(false), 2000);
  // };

  useEffect(() => {
    limitMess ? setMassage(true) : setMassage(false);

    // if (limitMess) {
    //   ;
    //   console.log('showMassege');
    //   showMassege();/
    // }
  });


  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  // let addPage = page;

  useEffect(() => {
    if (cards.length > 0) return;
    dispatch(getPhotosRequestAsing());
    console.log('jopa');
  }, []);


  // useEffect(() => {
  //   if (cards.length > 0 && page === newPage) return;
  //   console.log('массив с фото > 0 и странина = новой странице');
  //   dispatch(getPhotosRequestAsing());
  // }, [newPage]),

  // useEffect(() => {
  //   dispatch(clearPhotos());
  //   console.log('удалил фото из стайта');
  //   if (newPage === 1) return;
  //   console.log('страница не равна первой пошел запрос фото');
  //   dispatch(getPhotosRequestAsing());
  // }, [token]);

  console.log(page);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (page > 1 && cards.length > 0) {
          console.log('До запроса переключилась страница');
          // ++addPage;
          // dispatch(nextPage(addPage));
          dispatch(getPhotosRequestAsing());
          console.log('переключилась страница');
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
  // }, [page]);
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
