import React from 'react';
import { connect } from 'react-redux';

const Stats = () => (
  <div className="container">
    <table className="table">
      <th>Game</th>
      <th>Times Achieved</th>
      <tbody>
        <tr>
          <td>Trappist Monk</td>
          <td>25</td>
        </tr>
      </tbody>
    </table>
  </div>
);
export default connect(null)(Stats);
