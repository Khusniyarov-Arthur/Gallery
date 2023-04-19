import style from './Card.module.css';
// import Photo from './Photo';
import Like from './Like';
import Author from './Author';
import Date from './Date';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';


export const Card = ({dataCard}) => {
  const {
    id,
    created,
    liked,
    countLikes,
    name,
    link,
    small,
  } = dataCard;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const Loaded = () => {
    setLoading(false);
  };

  return (
    <div className={style.wrap} style={{visibility: loading ? 'hidden' : 'visible'}}>
      <div
        onClick={() => {
          navigate(`/photo/${id}`);
        }}>
        {/* <Photo small={small} onLoad={imageLoaded}/> */}
        <img onLoad={Loaded} className={style.photo} src={small} alt='photo'/>
      </div>
      <div className={style.footer}>
        <Like count={[countLikes, liked, id]}/>
        <Author author={[name, link]}/>
        <Date date={created}/>
      </div>
    </div>
  );
};

Card.propTypes = {
  dataCard: PropTypes.object,
};
