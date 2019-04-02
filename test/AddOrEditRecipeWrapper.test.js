/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, find, findWhere, simulate } from 'enzyme';
import { shallowToJson, mountToJson } from 'enzyme-to-json';
import { MemoryRouter } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import THEME from '../src/common/theme';
import AddOrEditRecipeWrapper from '../src/components/recipes/AddOrEditRecipeWrapper';
import AddOrEditRecipe from '../src/components/recipes/AddOrEditRecipe';

configure({ adapter: new Adapter() });

const fakeLocation = {
  state: {
    recipe: {
      description: "You need to make something",
      recipeName: "A hamburger",
      ingredients: [
        {
          name: "Sone ingredient",
          id: "adasdasdasdasdasdasd",
          amount: 1,
          unit: "ml"
        },
        {
          name: "Some ingredient 02",
          id: "adasdasd12345678",
          amount: 1,
          unit: "kg"
        }
      ]
    }
  }
}

const fakeMatch = {
  params: {
    id: "123456789"
  }
}


describe('<AddOrEditRecipeWrapper />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AddOrEditRecipe />)
  })
  it('renders full DOM of AddOrEditRecipeWrapper', () => {
    console.log(wrapper.debug());
  });

});

