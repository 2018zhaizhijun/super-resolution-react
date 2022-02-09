import React from 'react';
import TransBlock from '@components/tran-block';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '@store';

describe('transform block render', () => {

  it('transform block should match snapshot', () => {
    const transWrapper = renderer.create(
        <Provider store={store}>
            <TransBlock />
        </Provider>
    ).toJSON();
    expect(transWrapper).toMatchSnapshot();
  });

})