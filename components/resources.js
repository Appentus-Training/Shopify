import gql from "graphql-tag";
import { Query } from "./node_modules/react-apollo";
import {
  Card,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
} from "./node_modules/@shopify/polaris";
import store from "./node_modules/store-js";
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";

const twoWeeksFromNow = new Date(Date.now() + 12096e5).toDateString();
const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        descriptionHtml
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

class ProductsList extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
  }

  render() {
    const app = this.context;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, "/modify-products");
    };
    return (
      <Query
        query={GET_PRODUCTS_BY_ID}
        variables={{
          ids: store.get("ids"),
        }}
      >
        {" "}
        {({ data, loading, error }) => {
          if (loading) return <div> Loading… </div>;
          if (error) return <div> {error.message} </div>;
          console.log(data);
          return (
            <Card>
              <ResourceList
                showHeader
                resourceName={{ singular: "Product", plural: "Products" }}
                items={data.nodes}
                renderItem={(item) => {
                  const media = (
                    <Thumbnail
                      source={
                        item.images.edges[0]
                          ? item.images.edges[0].node.originalSrc
                          : ""
                      }
                      alt={
                        item.images.edges[0]
                          ? item.images.edges[0].node.altText
                          : ""
                      }
                    />
                  );
                  const price = item.variants.edges[0].node.price;
                  return (
                    <ResourceList.Item
                      id={item.id}
                      media={media}
                      accessibilityLabel={`View details for ${item.title}`}
                      onClick={() => {
                        store.set("item", item);
                        redirectToProduct();
                      }}
                    >
                      <Stack>
                        <Stack.Item fill>
                          <h3>
                            <TextStyle variation="strong">
                              {item.title}
                            </TextStyle>
                          </h3>
                        </Stack.Item>
                        <Stack.Item>
                          <p>${price}</p>
                        </Stack.Item>
                        <Stack.Item>
                          <p>Expires on {twoWeeksFromNow} </p>
                        </Stack.Item>
                      </Stack>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default ProductsList;
