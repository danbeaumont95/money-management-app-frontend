/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import axios from 'axios';
import { FormattedDateData } from './LinkedAccount';
import '../Styles/TransactionModal.css';

type State = {
  // image: string;
  imageAvailable: boolean
}
type Props = {
  transaction: FormattedDateData;
  closeModal: () => void
}

export default class TransactionModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { imageAvailable: false };
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  componentDidMount() {
    axios.get('https://logo.clearbit.com/www.amazon.com')
      .then(() => {
        this.setState({ imageAvailable: true });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  getImageUrl = (transaction: FormattedDateData) => {
    const image = transaction.merchant_name ? `https://logo.clearbit.com/www.${transaction.merchant_name}.com` : `https://logo.clearbit.com/www.${transaction.name}.com`;
    return image;
  };

  render() {
    const { transaction, closeModal } = this.props;
    return (

      <div className="singleTransactionModalContainer">
        <button onClick={closeModal} type="button">X</button>
        <div>
          {this.state.imageAvailable ? (

            <img className="transactionMerchantImage" src={this.getImageUrl(transaction)} alt="" />
          ) : null}

          <h4>{transaction.merchant_name}</h4>
          <h4>{transaction.name}</h4>
          <h4>
            Amount:
            {' '}
            {getSymbolFromCurrency(transaction.iso_currency_code)}
            {transaction.amount.toString().indexOf('.') > 0 ? transaction.amount.toFixed(2) : transaction.amount}
          </h4>
          <h4>
            Category:
            {' '}
            {transaction.category.join(', ')}
          </h4>
          <h4>
            Pending?:
            {' '}
            {transaction.pending ? 'True' : 'False'}
          </h4>
          <h4>
            Place:
            {' '}
            {transaction.transaction_type}
          </h4>
          <h4>
            Payment Channel:
            {' '}
            {transaction.payment_channel}
          </h4>
        </div>
      </div>

    );
  }
}
