/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import '../Styles/LinkedAccounts.css';
import Swal from 'sweetalert2';
import getSymbolFromCurrency from 'currency-symbol-map';
import UserService from '../services/user';

interface AccountBalance {
  available: number;
  current: number;
  iso_currency_code: string;
  limit: number;
  unofficial_currency_code: any
}

export interface Account {
  account_id: string;
  balances: AccountBalance;
  mask: string;
  name: string;
  official_name: any;
  subtype: string;
  type: string
}
type Props = {};
type State = {
  accounts: Array<Account>;
};

export default class LinkedAccounts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accounts: [],
    };
  }

  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken');
    UserService.getLinkedAccounts(accessToken)
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (!res.data.accounts) {
          return Swal.fire({
            title: 'Error',
            text: 'Unable to get accounts',
          });
        }
        if (!res.data.accounts.length) {
          return Swal.fire({
            title: 'Success',
            text: 'No accounts found',
          });
        }
        this.setState({ accounts: res.data.accounts });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  onCardClick(id: string) {
    // eslint-disable-next-line no-return-assign
    return window.location.href = `/linkedAccounts/${id}`;
  }

  render() {
    const { accounts } = this.state;
    return (
      <>
        <h1>Linked Accounts</h1>
        {accounts.length ? accounts.map((el) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div className="linkedAccountCard" onClick={() => this.onCardClick(el.account_id)}>
            <p>
              <strong>Account: </strong>
              {el.name}
            </p>
            <p>
              <strong>Balance: </strong>
              {getSymbolFromCurrency(el.balances.iso_currency_code)}
              {el.balances.available}
            </p>
          </div>
        )) : null}
      </>
    );
  }
}
