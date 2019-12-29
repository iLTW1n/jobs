import React from 'react';
import renderer from 'react-test-renderer';
import CardJob from '../';

test('render Search component', () => {
  const props = {
    title: 'Jobss',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    locationNames: 'Lima, Perú',
    applyUrl: 'https://github.com/JOsktgui/jobs',
    company: {
      name: 'Jobs',
      slug: 'jobs'
    },
    commitment: {
      title: 'Full-Time',
      slug: 'full-time'
    },
    postedAt: '2019-08-12T20:19:52.000Z',
    countries: [
      { name: 'Perú', slug: 'peru' }
    ]
  };

  const component = renderer.create(<CardJob {...props} />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
