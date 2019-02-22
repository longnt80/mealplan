import React, { Component } from 'react';

class ViewRecipe extends Component {
  render() {
    return (
      <div>
        View recipe with id: {this.props.match.params.id}
      </div>
    );
  }
}

export default ViewRecipe;
