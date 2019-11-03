import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $author: String!
    $publisher: String!
    $description: String!
    $year: Int!
    $fiction: Boolean!
    $image: String
    $largeimage: String
  ) {
    createItem(
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
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    author: "",
    publisher: "",
    description: "",
    fiction: false,
    image: "",
    largeimage: "",
    year: 0
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  toggleChange = () => {
    this.setState({ fiction: !this.state.fiction });
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
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              // call the mutation
              const res = await createItem();
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
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
                  value={this.state.title}
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
                  value={this.state.author}
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
                  value={this.state.publisher}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="year">
                Jahr
                <input
                  type="number"
                  id="year"
                  name="year"
                  placeholder="year"
                  required
                  value={this.state.year}
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
                  placeholder="Enter a description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
            <h2>Buch hochladen</h2>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
