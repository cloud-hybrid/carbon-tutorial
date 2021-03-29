import {gql} from "apollo-boost";

const Headers = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "createdAt",
    header: "Created",
  },
  {
    key: "updatedAt",
    header: "Updated",
  },
  {
    key: "issueCount",
    header: "Open Issues",
  },
  {
    key: "stars",
    header: "Stars",
  },
  {
    key: "links",
    header: "Links",
  },
];

const Query = gql`
  query QUERY {
    organization(login: "carbon-design-system") {
      repositories(first: 75, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          url
          homepageUrl
          issues(filterBy: { states: OPEN }) {
            totalCount
          }
          stargazers {
            totalCount
          }
          releases(first: 1) {
            totalCount
            nodes {
              name
            }
          }
          name
          updatedAt
          createdAt
          description
          id
        }
      }
    }
  }
`;

const Repositories = {
  "Headers": Headers,
  "Query": Query
}; export default Repositories;
