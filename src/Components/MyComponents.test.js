
import React from 'react';
import { mount } from 'enzyme';

import BookList from './BookList';

it('should not show any results if no books', () => {
  const elem = mount(<BookList show={!show} />).toJSON();
  expect(elem).isEmpty();
});

it('should show book volume and image links', () => {
    const elem = mount(<BookList thumbnail={item.volumeInfo.imageLinks} />).toJSON();
    expect(elem).toMatchSnapshot();
});

it('should show small thumbnail too', () => {
    const elem = renderer.create(<BookList thumbnail={item.volumeInfo.imageLinks.smallThumbnail} />).toJSON();
    expect(elem).toMatchSnapshot();
});