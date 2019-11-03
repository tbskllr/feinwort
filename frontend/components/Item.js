import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import ItemStyles from "./styles/ItemStyles";

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        <Link
          href={{
            pathname: "/item",
            query: { id: item.id }
          }}
        >
          {item.image && <img src={item.image} alt={item.title} />}
        </Link>
      </ItemStyles>
    );
  }
}
