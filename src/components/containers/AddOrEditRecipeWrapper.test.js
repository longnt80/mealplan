/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, find, findWhere, simulate } from 'enzyme';
import { shallowToJson, mountToJson } from 'enzyme-to-json';
import { MemoryRouter } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import THEME from '../../common/theme';
import AddOrEditRecipeWrapper from './AddOrEditRecipeWrapper';
import AddOrEditRecipe from '../AddOrEditRecipe';

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
  it('renders full DOM of AddOrEditRecipeWrapper', () => {
    const wrapper = mount(
      <MuiThemeProvider theme={THEME}>
        <MemoryRouter>
          <AddOrEditRecipeWrapper location={fakeLocation} match={fakeMatch} history={mockHistory} />
        </MemoryRouter>
      </MuiThemeProvider>
    );
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  // it('render AddOrEditRecipe to have correct number of ingredient field', () => {
  //   const wrapper = mount(
  //     <MuiThemeProvider theme={THEME}>
  //       <BrowserRouter>
  //         <AddOrEditRecipeWrapper location={fakeLocation} />
  //       </BrowserRouter>
  //     </MuiThemeProvider>
  //   );
  //   expect(wrapper.find('div.ingredientField')).toHaveLength(2);
  // });

  // it('render ingredient field correctly after click "More ingredient" button', () => {
  //   const wrapper = mount(
  //     <MuiThemeProvider theme={THEME}>
  //       <BrowserRouter>
  //         <AddOrEditRecipeWrapper location={fakeLocation} />
  //       </BrowserRouter>
  //     </MuiThemeProvider>
  //   );
  //   expect(wrapper.find('div.ingredientField')).toHaveLength(2);
  //   expect(wrapper.findWhere(n => (n.text() === "More ingredient" && n.type() === "span"))).toHaveLength(1);
  //   wrapper.findWhere(n => (n.text() === "More ingredient" && n.type() === "span")).simulate('click');
  //   expect(wrapper.find('div.ingredientField')).toHaveLength(3);
  // });
});

