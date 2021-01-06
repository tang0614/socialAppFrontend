import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  state = {};

  render() {
    const { count, handlePageClick, currentPage, numberPerPage } = this.props;

    const numberOfPages = Math.ceil(count / numberPerPage);
    console.log(currentPage);

    if (1 === numberOfPages && currentPage === numberOfPages) {
      return null;
    }
    const page_array = _.range(1, numberOfPages + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {page_array.map((p) => (
            <li
              key={p}
              className={p === currentPage ? "page-item active" : "page-item"}
            >
              <a className="page-link" onClick={() => handlePageClick(p)}>
                {p}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
