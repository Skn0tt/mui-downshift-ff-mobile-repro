import * as React from "react";
import { render } from "react-dom";
import MuiDownshift from "mui-downshift";

const items = [
  "Item 1",
  "Item 2"
];

export class SearchableDropdown extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      filteredItems: props.items
    };

    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(changes) {
    const { items, includeItem } = this.props;
    if (changes.type === "__autocomplete_change_input__") {
      const filteredItems = items.filter(i =>
        includeItem(i, changes.inputValue)
      );
      this.setState({ filteredItems });
    }
  };

  render() {
    const { itemToString, onChange, label, helperText } = this.props;
    const { filteredItems } = this.state;

    const itemsToShow = filteredItems.map(i => ({
      value: i,
      label: itemToString(i)
    }));

    return (
      <MuiDownshift
        items={itemsToShow}
        onChange={selection => onChange(!!selection ? selection.value : undefined)}
        onStateChange={this.handleStateChange}
        getInputProps={() => ({ helperText })}
      />
    );
  }
}


const App = () => {
  return (
    <SearchableDropdown
      items={items}
      onChange={console.log}
      itemToString={i => i}
      helperText="This is a helpertext"
      includeItem={(u, searchTerm) =>
        u
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
      }
    />
  );
}

const root = document.getElementById("root");
render(<App />, root);