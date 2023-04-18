import style from './Author.module.css';
import PropTypes from 'prop-types';

export const Author = ({author}) => {
  const [name, link] = author;

  return (
    <div >
      <a className={style.author} href={link}>{name}</a>
    </div>
  );
};

Author.propTypes = {
  author: PropTypes.array,
};
