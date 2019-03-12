import React from 'react';
import AddOrEditRecipeWrapper from './AddOrEditRecipeWrapper';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const component = renderer.create(
    <AddOrEditRecipeWrapper
      location={
        {
          state: {
            recipe: {
              description: "You need to make something",
              recipeName: "A hamburger",
              ingredients: [
                {
                  name: "Long",
                  id: "adasdasdasdasdasdasd",
                  amount: 1,
                  unit: "ml"
                },
                {
                  name: "Phuong",
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
  ).toJSON();

  expect(component).toMatchSnapshot();
});
