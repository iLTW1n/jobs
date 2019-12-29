import React from 'react';
import { truncate, map } from 'lodash';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import './styles.less';

const CardJob = (props: any) => {
  const {
    title,
    description,
    locationNames,
    applyUrl,
    company,
    commitment,
    postedAt,
    countries
  } = props;

  return (
    <div className='container-card-job'>
      <h2 className='container-card-job__title'>{ title }</h2>

      <div className='container-card-job__item'>
        <span>Ubicación:</span> { locationNames }
      </div>
      <div className='container-card-job__item'>
        <span>Empresa:</span> { company.name }
      </div>
      <div className='container-card-job__item'>
        <span>Modalidad:</span> { commitment.title }
      </div>
      <div className='container-card-job__item'>
        <span>Publicado:</span> { formatDistance(new Date(postedAt), new Date(), { locale: es }) }
      </div>

      <div className='container-card-job__item'>
        <span>Países:</span> { map(countries, item => item.name) }
      </div>

      <p className='container-card-job__description'>
        { truncate(description, { length: 320 }) }
      </p>
      <a
        href={applyUrl}
        rel='noopener noreferrer'
        target='_blank'
        className='container-card-job__apply'
      >
        APLICAR
      </a>
    </div>
  );
};

export default CardJob;
