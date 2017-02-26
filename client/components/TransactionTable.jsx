import React from 'react';
import { connect } from 'react-redux';
import { renderTransactions } from '../helpers/transactionHelpers.jsx';
import { rerenderTransactions, updateTransaction } from '../actions/transActions';

class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  handleSelect({ target, nativeEvent }) {
    const { value } = target;
    const id = target.attributes['data-id'].value;
    const name = nativeEvent.path[2].children[0].innerText;

    if (!(+target.attributes['data-tier'].value)) {
      this.dispatch(updateTransaction({ id, categories: `["${value}"]`, user_id: this.props.userId }));
      this.dispatch(rerenderTransactions({ id, categories: [value], name }));
    } else {
      const main = nativeEvent.path[2].children[3].children[0].value;
      this.dispatch(updateTransaction({ id, categories: `["${main}","${value}"]`, user_id: this.props.userId }));
      this.dispatch(rerenderTransactions({ id, categories: [main, value], name }));
    }
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
  userId: state.user.id,
}))(TransactionTable);
