import style from './Photo.module.css';
import PropTypes from 'prop-types';

export const Photo = ({small}) => {
  return (
    <img className={style.photo} src={small} alt='photo'/>
  );
};

Photo.propTypes = {
  small: PropTypes.string,
};
