import gql from 'graphql-tag';

export const QUERY_RESOURCE = gql`
query resource($_id: ID!) {
    resource(_id: $_id) {
      _id
      name
      shortDescription
      username
      resourceBody
      dateCreated
      cost
      images{
            fileURL
            imageCaption
      }
      videos{
            fileURL
            videoCaption
      }
    }
  }
`;

export const QUERY_RESOURCES_HOMEPAGE = gql`
{
  resources {
      _id
      name
      shortDescription 
      username
      dateCreated
      cost
      images{
        fileURL
        imageCaption
      }
  }
}
`;

export const QUERY_RESOURCES_SEARCH = gql`
query resource_search($text: String!) {
  resources_search(text: $text) {
    _id
    name
    shortDescription
    username
    dateCreated
    cost
    images{
      fileURL
      imageCaption
    }
  }
}
`;

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    firstName
    lastName
    email
    resourceCount
    resources {
      _id
      name
      shortDescription
      resourceBody
      dateCreated
      username
      cost
    }
  }
}
`;

export const QUERY_ME = gql`
{
  me {
    _id
    username
    firstName
    lastName
    email
    wallet
    resourceCount
    resources {
      _id
      name
      shortDescription
      resourceBody
      dateCreated
      username
      cost
      images {
        fileURL
        imageCaption
      }
      videos {
        fileURL
        videoCaption
      }
    }
    paidResources {
      _id
      name
      shortDescription
      dateCreated
      username
      images {
        fileURL
        imageCaption
      }
    }
  }
}
`;

export const QUERY_ME_BASIC = gql`
{
  me {
    _id
    username
    firstName
    lastName
    email
    resourceCount
  }
}
`;

export const QUERY_USER_PAID_RESOURCES = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    paidResources {
      _id
      name
      shortDescription
      dateCreated
      username
    }
  }
}`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [CheckoutProductInput]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_TRANSACTIONSUSER = gql`
query($username: String!)
{transactionsUser(username: $username)
  {
    dateCreated,
    username,
    resource_id,
    resource_name,
    amount,
    fee
  }
}
`;