import React, { Component } from 'react';
import '../Styles/LinkedAccounts.css'
import Swal from 'sweetalert2';
import UserService from '../services/user'
import getSymbolFromCurrency from 'currency-symbol-map';

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
    super(props)
    this.state = {
      accounts: []
    }
  }

  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken')
    UserService.getLinkedAccounts(accessToken)
      .then((res) => {
        if (!res.data.accounts) {
          return Swal.fire({
            title: 'Error',
            text: 'Unable to get accounts'
          })
        }
        if (!res.data.accounts.length) {
          return Swal.fire({
            title: 'Success',
            text: 'No accounts found'
          })
        }
        this.setState({accounts: res.data.accounts})
      })
  }

  onCardClick(id: string) {
    return window.location.href=`/linkedAccounts/${id}`
  }
    render() {
      const {accounts} = this.state;
      return (
        <>
        <h1>Linked Accounts</h1>
        {accounts.length ? accounts.map((el) => (
          <div className="linkedAccountCard" onClick={() => this.onCardClick(el.account_id)}>
            <p><strong>Account: </strong>{el.name}</p>
            <p><strong>Balance: </strong>{getSymbolFromCurrency(el.balances.iso_currency_code)}{el.balances.available}</p>
          </div>
        )) : null}
        </>
      )
    }
}
