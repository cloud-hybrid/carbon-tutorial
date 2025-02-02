import React, { useState } from "react";
import Exports from "./Table";
import Repositories from "./Query"
import { Query } from "react-apollo";
import { Link, DataTableSkeleton, Pagination } from "carbon-components-react";

const Table = Exports["Table"];

const LinkList = ({ url, homepageUrl }) => (
  <ul style={{ display: "flex" }}>
    <li>
      <Link href={url}>GitHub</Link>
    </li>
    {homepageUrl && (
      <li>
        <span>&nbsp;|&nbsp;</span>
        <Link href={homepageUrl}>Homepage</Link>
      </li>
    )}
  </ul>
);

const getRowItems = rows =>
  rows.map(row => ({
    ...row,
    key: row.id,
    stars: row.stargazers.totalCount,
    issueCount: row.issues.totalCount,
    createdAt: new Date(row.createdAt).toLocaleDateString(),
    updatedAt: new Date(row.updatedAt).toLocaleDateString(),
    links: <LinkList url={row.url} homepageUrl={row.homepageUrl} />,
  }));

const Development = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  return (
    <div className="bx--grid bx--grid--full-width bx--grid--no-gutter repo-page">
      <div className="bx--row repo-page__r1">
        <div className="bx--col-lg-16">
          <Query query={Repositories["Query"]}>
            {({ loading, error, data: { organization } }) => {
              // Wait for the request to complete
              if (loading)
                return (
                  <DataTableSkeleton
                    columnCount={Repositories["Headers"].length + 1}
                    rowCount={10}
                    headers={Repositories["Headers"]}
                  />
                );

              // Something went wrong with the data fetching
              if (error) return `Error! ${error.message}`;

              // If we"re here, we"ve got our data!
              const { repositories } = organization;
              setTotalItems(repositories.totalCount);
              const rows = getRowItems(repositories.nodes);

              return (
                <>
                  <Table
                    headers={Repositories["Headers"]}
                    rows={rows.slice(
                      firstRowIndex,
                      firstRowIndex + currentPageSize
                    )}
                  />
                  <Pagination
                    totalItems={totalItems}
                    backwardText="Previous page"
                    forwardText="Next page"
                    pageSize={currentPageSize}
                    pageSizes={[5, 10, 15, 25]}
                    itemsPerPageText="Items per page"
                    onChange={({ page, pageSize }) => {
                      if (pageSize !== currentPageSize) {
                        setCurrentPageSize(pageSize);
                      }
                      setFirstRowIndex(pageSize * (page - 1));
                    }}
                  />
                </>
              );
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Development;
