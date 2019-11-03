import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";

function createClient({ headers }) {
  return new ApolloClient({
    uri: "http://yoga.feinwort.eu",
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers: {
          cookie: headers && headers.cookie // NOTE: client-side headers is undefined!
        }
      });
    }
  });
}

export default withApollo(createClient);
