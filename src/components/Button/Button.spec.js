import { test } from '@util/testing'
import Vue from 'vue';
import Button from './Button';

test('Button.js', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(Button);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
