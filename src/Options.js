import React from "react";
import { Dropdown } from "semantic-ui-react";

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleHemisphereChange = this.handleHemisphereChange.bind(this);
    this.state = {
      month: new Date().getMonth() + 1,
      hemisphere: localStorage.getItem("ACNHHemisphere")
        ? localStorage.getItem("ACNHHemisphere")
        : "Northern Hemisphere",
    };
  }

  handleMonthChange(e, newMonth) {
    this.props.overwriteMonth(newMonth.value);
  }

  handleHemisphereChange(e, newHemisphere) {
    this.props.changeHemisphere(newHemisphere.value);
  }

  componentDidMount() {
    this.props.overwriteMonth(this.state.month);
    this.props.changeHemisphere(this.state.hemisphere);
  }

  render() {
    const hemisphereOptions = [
      {
        key: "Northern Hemisphere",
        text: "Northern Hemisphere",
        value: "Northern Hemisphere",
      },
      {
        key: "Southern Hemisphere",
        text: "Southern Hemisphere",
        value: "Southern Hemisphere",
      },
    ];
    const months = [
      { key: 1, text: "January", value: 1 },
      { key: 2, text: "February", value: 2 },
      { key: 3, text: "March", value: 3 },
      { key: 4, text: "April", value: 4 },
      { key: 5, text: "May", value: 5 },
      { key: 6, text: "June", value: 6 },
      { key: 7, text: "July", value: 7 },
      { key: 8, text: "August", value: 8 },
      { key: 9, text: "September", value: 9 },
      { key: 10, text: "October", value: 10 },
      { key: 11, text: "November", value: 11 },
      { key: 12, text: "December", value: 12 },
    ];
    return (
      <span>
        Hemisphere:
        <Dropdown
          className="Options"
          options={hemisphereOptions}
          defaultValue={this.state.hemisphere}
          inline
          onChange={this.handleHemisphereChange}
        />
        <br />
        Current Month:
        <Dropdown
          className="Options"
          options={months}
          defaultValue={this.state.month}
          inline
          onChange={this.handleMonthChange}
        />
      </span>
    );
  }
}
export default Options;
