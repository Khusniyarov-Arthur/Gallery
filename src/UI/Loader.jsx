import HashLoader from 'react-spinners/HashLoader';

export const Loader = () => {
  return (
    <HashLoader
      color="#7b7777"
      size={61}
      cssOverride={{
        margin: '100px auto'
      }}
    />
  );
};
