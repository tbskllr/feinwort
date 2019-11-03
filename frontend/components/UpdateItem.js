import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      author
      publisher
      description
      year
      fiction
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $author: String
    $publisher: String
    $description: String
    $year: Int
    $fiction: Boolean
    $image: String
    $largeimage: String
  ) {
    updateItem(
      id: $id
      title: $title
      author: $author
      publisher: $publisher
      description: $description
      year: $year
      fiction: $fiction
      image: $image
      largeimage: $largeimage
    ) {
      id
      title
      author
      publisher
      description
      year
      fiction
      image
      largeimage
    }
  }
`;

class UpdateItem extends Component {
  state = {};
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  toggleChange = () => {
    this.setState({ fiction: !this.state.fiction });
  };
  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log("Updating Item!!");
    console.log(this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    console.log("Updated!!");
  };
  uploadFile = async e => {
    console.log("uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "feinwort");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dot3alymv/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeimage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="file">
                      Image
                      <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Upload an image"
                        onChange={this.uploadFile}
                      />
                      {this.state.image && (
                        <img
                          width="200"
                          src={this.state.image}
                          alt="Upload Preview"
                        />
                      )}
                    </label>

                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="author">
                      Autor/in
                      <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Autor/in"
                        required
                        defaultValue={data.item.author}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="publisher">
                      Verlag
                      <input
                        type="text"
                        id="publisher"
                        name="publisher"
                        placeholder="Verlag"
                        required
                        defaultValue={data.item.publisher}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="year">
                      Jahr
                      <input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Jahr"
                        required
                        defaultValue={data.item.year}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="fiction">
                      Belletristik?
                      <input
                        type="checkbox"
                        id="fiction"
                        name="fiction"
                        value={this.state.fiction}
                        onChange={this.toggleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        required
                        defaultValue={data.item.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Sav{loading ? "ing" : "e"} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
