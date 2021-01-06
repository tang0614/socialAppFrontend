import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class TableBody extends Component {
  getTableValue(r, c) {
    if (c.content) {
      return c.content(r);
    } else {
      const str = c.path;

      if (typeof str !== "undefined") {
        const path = str.split(".");
        const p1 = path[0];

        if (path.length > 1) {
          const p2 = path[1];
          return r[p1][p2];
        } else {
          return r[p1];
        }
      }
    }
  }
  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((r) => (
          <tr key={r._id}>
            {columns.map((c) => (
              <td scope="col" key={c.name || c.key}>
                {c.name === "Title" ? (
                  <NavLink to={`./movies/${r._id}`}>
                    {this.getTableValue(r, c)}
                  </NavLink>
                ) : (
                  this.getTableValue(r, c)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
