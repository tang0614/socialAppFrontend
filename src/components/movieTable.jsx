import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import Delete from "./common/delete";
import { getCurrentUser } from "../services/userService";

class movieTable extends Component {
  render() {
    const {
      movies,
      handleLike,
      handleDelete,
      sortColumn,
      handleSort,
    } = this.props;

    let columns = [
      { name: "Title", path: "title" },
      { name: "Genre", path: "genre.name" },
      { name: "Number In Stock", path: "numberInStock" },
      { name: "Daily Rental Rate", path: "dailyRentalRate" },
      {
        key: "Like",
        content: (movie) => <Like movie={movie} handleLike={handleLike} />,
      },
    ];

    const deleteColumn = {
      key: "Delete",
      content: (movie) => <Delete movie={movie} handleDelete={handleDelete} />,
    };

    const user = getCurrentUser();
    if (user && user.isAdmin) {
      columns.push(deleteColumn);
    }

    return (
      <Table
        data={movies}
        columns={columns}
        sortColumn={sortColumn}
        handleSort={handleSort}
      />
    );
  }
}

export default movieTable;
