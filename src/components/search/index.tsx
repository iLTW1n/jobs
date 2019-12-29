import React, { FC } from 'react';
import searchSvg from '../../images/busqueda.svg';
import './styles.less';

interface IProps {
  onChange: (value: string) => void
}

const Search: FC<IProps> = ({ onChange }) => {
  return (
    <div className='container-search'>
      <input
        type='text'
        placeholder='Buscar'
        onChange={event => {
          onChange(event.target.value);
        }}
      />
      <img src={searchSvg} alt='search-svg' />
    </div>
  );
};

export default Search;
