import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import DeleteItem from "./DeleteItem";
import User from "./User";
import Link from "next/link";
import styled from "styled-components";
import Head from "next/head";

const StyledButtons = styled.div`
  text-transform: uppercase;
  white-space: pre;
  .button {
    padding: 10px;
  }
`;

const SingleItemStyles = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: 700px) {
    flex-wrap: wrap;
    margin: 1rem;
  }
  img {
    width: 3000%;
    max-width: 300px;
    height: auto;
    margin: 1rem;
  }
  .details {
    margin: 1rem;
    font-size: 1rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      year
      author
      description
      image
    }
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item found for {this.props.id}</p>;
          const item = data.item;
          return (
            <User>
              {({ data: { me } }) => (
                <SingleItemStyles>
                  <Head>
                    <title>feinwort. | {item.title}</title>
                  </Head>
                  <img src={item.image} alt={item.title} />
                  <div className="details">
                    <h2>
                      {item.title} ({item.year})
                    </h2>
                    <h3>{item.author}</h3>
                    <p>{item.description}</p>
                  </div>
                  {me && (
                    <StyledButtons>
                      <Link
                        href={{
                          pathname: "update",
                          query: { id: item.id }
                        }}
                      >
                        <button>
                          <a>Edit ✏️</a>
                        </button>
                      </Link>
                      <DeleteItem className="button" id={item.id}>
                        Delete This Item ❌
                      </DeleteItem>
                    </StyledButtons>
                  )}
                </SingleItemStyles>
              )}
            </User>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
