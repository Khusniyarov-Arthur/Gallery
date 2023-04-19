import style from './List.module.css';
import Card from './Card';
import Masonry from 'react-masonry-css';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import {
  nextPage,
  getPhotosRequestAsing,
  clearPhotos,
} from '../../../store/getPhotos/actionGetPhotos';
import {Loader} from '../../../UI/Loader';

export const List = () => {
  const endList = useRef(null);
  const page = useSelector(state => state.getPhotosReducer.page);
  const newPage = useSelector(state => state.getPhotosReducer.newPage);
  const token = useSelector(state => state.tokenReducer.token);
  const dispatch = useDispatch();
  const cards = useSelector(state => state.getPhotosReducer.data);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  let addPage = page;

  useEffect(() => {
    if (cards.length > 0 && page === newPage) return;
    dispatch(getPhotosRequestAsing());
  }, [newPage]),

  useEffect(() => {
    dispatch(clearPhotos());
    if (newPage === 1) return;
    dispatch(getPhotosRequestAsing());
  }, [token]);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        ++addPage;
        dispatch(nextPage(addPage));
      }
    }, {
      rootMargin: '100px',
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
