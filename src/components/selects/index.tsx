import React, { FC } from 'react';
import Select from 'react-select';
import './styles.less';

import { map } from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const COUNTRIES = gql`
  {
    countries {
      name
      slug
    }
  }
`;

const COMPANIES = gql`
  {
    companies {
      name
      slug
    }
  }
`;

const options = [
  { value: 'recent', label: 'Recientes' },
];


function adaptSelect(values: any, name: string) {
  if (values.data) {
    return map(values.data[name], item => {
      return {
        label: item.name,
        value: item.slug
      }
    })
  }

  return [];
}

interface IProps {
  setFilterBy: any,
  filterBy: { country: null | string, company: null | string }
}

const Selects: FC<IProps> = ({ setFilterBy, filterBy }) => {
  const countries = useQuery(COUNTRIES);
  const companies = useQuery(COMPANIES);

  return (
    <div className='container-selects'>
      <Select
        isLoading={countries.loading}
        noOptionsMessage={() => 'No hay resultados'}
        placeholder='País'
        options={adaptSelect(countries, 'countries')}
        isClearable
        onChange={(optionSelected: any) => {
          setFilterBy({
            ...filterBy,
            country: optionSelected && optionSelected.value
          });
        }}
      />
      <Select
        isLoading={companies.loading}
        noOptionsMessage={() => 'No hay resultados'}
        placeholder='Empresa'
        options={adaptSelect(companies, 'companies')}
        isClearable
        onChange={(optionSelected: any) => {
          setFilterBy({
            ...filterBy,
            company: optionSelected && optionSelected.value
          });
        }}
      />
      <Select
        noOptionsMessage={() => 'No hay resultados'}
        placeholder='Fecha de publicación'
        options={options}
        isClearable
        onChange={(optionSelected: any) => {
          setFilterBy({
            ...filterBy,
            publicationDate: optionSelected && optionSelected.value
          });
        }}
      />
    </div>
  );
};

export default Selects;
