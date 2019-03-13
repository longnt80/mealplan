import React from 'react';
import { BrowserRouter } from "react-router-dom";
import AddOrEditRecipeWrapper from './AddOrEditRecipeWrapper';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const component = renderer.create(
    <BrowserRouter>
      <AddOrEditRecipeWrapper
        location={
          {
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
        }
      />
    </BrowserRouter>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
