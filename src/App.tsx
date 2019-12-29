import React, { useState } from 'react';
import { Header, Search, Selects, CardJob } from './components';
import { ClapSpinner } from 'react-spinners-kit';
import './app.less';

import { map, filter, isEmpty } from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const JOBS = gql`
  {
    jobs {
      id
      title
      slug
      description
      applyUrl
      locationNames
      postedAt
      commitment {
        title
        slug
      }
      countries {
        name
        slug
      }
      company {
        name
        slug
      }
    }
  }
`;

interface IFilterBy {
  country: null | string,
  company: null | string,
  publicationDate: null | string
}

interface ICountry {
  name: string,
  slug: string
}

const App = () => {
  const jobs = useQuery(JOBS);
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState<IFilterBy>({
    country: null,
    company: null,
    publicationDate: null
  });

  function jobsData() {
    if (filterBy.country && filterBy.company) {
      let returnableData = filter(jobs.data.jobs, item => {
        return item.countries.some((country: { name: string, slug: string }) => {
          return country.slug === filterBy.country;
        }) && item.company.slug === filterBy.company
      });

      if (search) {
        return filter(returnableData, item => {
          return item.title.toLowerCase().includes(search.toLowerCase());
        });
      }

      return returnableData;
    }

    if (filterBy.country) {
      let returnableData = filter(jobs.data.jobs, item => item.countries.some((country: ICountry) => {
        return country.slug === filterBy.country;
      }));

      if (search) {
        return filter(returnableData,  item => {
          return item.title.toLowerCase().includes(search.toLowerCase())
        })
      }

      return returnableData;
    }

    if (filterBy.company) {
      let returnableData = filter(jobs.data.jobs, item => {
        return item.company.slug === filterBy.company;
      });

      if (search) {
        return filter(returnableData, item => {
          return item.title.toLowerCase().includes(search.toLowerCase());
        })
      }

      return returnableData;
    }

    if (jobs.data) {
      return jobs.data.jobs;
    }

    return [];
  }

  function sortData() {
    if (filterBy.publicationDate) {
      return jobsData().sort((a: any, b: any) => {
        return b.postedAt.localeCompare(a.postedAt);
      })
    }

    return jobsData().sort((a: any, b: any) => {
      return a.postedAt.localeCompare(b.postedAt);
    })
  }

  return (
    <div>
      <Header />
      <div className='container-app__actions'>
        <Search onChange={value => setSearch(value)} />
        <Selects filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>
      <div className='container-app__jobs'>
        { jobs.loading ?
          <div className='container-app__spinner'>
            <ClapSpinner frontColor='#2684FF' />
          </div> :
          isEmpty(jobsData()) ?
            'No hay datos!' :
            map(sortData(), item => {
              return (
                <CardJob
                  key={item.id}
                  {...item}
                />
              )
            })
        }
      </div>
    </div>
  );
};

export default App;
