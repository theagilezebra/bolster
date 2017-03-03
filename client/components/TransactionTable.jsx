import React from 'react';
import { connect } from 'react-redux';
import { renderTransactions } from '../helpers/transactionHelpers.jsx';
import { updateTransaction } from '../actions/transActions';

class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  handleSelect({ target, nativeEvent }) {
    const { value } = target;
    const id = target.attributes['data-id'].value;

    !(+target.attributes['data-tier'].value)
      ? this.dispatch(updateTransaction({ id, categories: `["${value}"]` }))
      : this.dispatch(updateTransaction({ id, categories: `["${nativeEvent.path[2].children[3].children[0].value}","${value}"]` }));
  }

  render() {
    return (
      <div className="quicksand">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Spent</th>
                <th>Date</th>
                <th>Category</th>
                <th>Subcategory</th>
              </tr>
            </thead>
            <tbody>
              {renderTransactions(this.props.transactions, this.props.categories, this.handleSelect.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  transactions: state.transactions.transactionsData,
  categories: state.categories.categoryData,
}))(TransactionTable);
