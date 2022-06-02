import React, { Component } from 'react'
import Swal from 'sweetalert2';
import UserService from '../services/user';
type IArrayOfStrings = Array<string>
interface Location {
  address: any;
  city:any;
  country: any;
  lat: any;
  lon: any;
  postal_code: any;
  region:any;
  store_number: any;
}

interface PaymentMeta {
  by_order_of: any;
  payee:any;
  payer: any;
  payment_method: any;
  payment_processor: any;
  ppd_id: any;
  reason:any;
  reference_number: any;
}
export interface Transaction {
  account_id: string;
  account_owner: any;
  amount: number;
  authorized_date: any;
  authorized_datetime: any;
  category: IArrayOfStrings;
  category_id: string;
  check_number: any;
  date: string;
  datetime: string;
  iso_currency_code: string;
  location: Location;
  merchant_name: string;
  name: string;
  payment_channel: string;
  payment_meta: PaymentMeta;
  pending: boolean;
  pending_transaction_id: any;
  personal_finance_category: any;
  transaction_code: string;
  transaction_id: string;
  transaction_type: string;
  unofficial_currency_code: any;
}

type State = {
  transactions: Array<Transaction>
}
type Props = {}

export default class LinkedAccount extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      transactions: []
    }
    this.onDayClick = this.onDayClick.bind(this)
    this.onWeekClick = this.onWeekClick.bind(this)
    this.onMonthClick = this.onMonthClick.bind(this)
  }
  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken')

    UserService.getAllTransactions(accessToken, 'week')
      .then((res) => {
        if (res.data.transactions) {
          this.setState({transactions: res.data.transactions})
        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Unable to fetch transactions, please try again later'
          })
        }
      })
  }

  onDayClick() {
    const accessToken: any = localStorage.getItem('accessToken')
    UserService.getAllTransactions(accessToken, 'day')
      .then((res) => {
        if (res.data.transactions) {
          this.setState({transactions: res.data.transactions})
        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Unable to fetch transactions, please try again later'
          })
        }
      })
  }

  onWeekClick() {
    const accessToken: any = localStorage.getItem('accessToken')
    UserService.getAllTransactions(accessToken, 'week')
      .then((res) => {
        if (res.data.transactions) {
          this.setState({transactions: res.data.transactions})
        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Unable to fetch transactions, please try again later'
          })
        }
      })
  }

  onMonthClick() {
    const accessToken: any = localStorage.getItem('accessToken')
    UserService.getAllTransactions(accessToken, 'month')
      .then((res) => {
        if (res.data.transactions) {
          this.setState({transactions: res.data.transactions})
        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Unable to fetch transactions, please try again later'
          })
        }
      })
  }
  render() {
    const { transactions } = this.state;
    console.log(transactions, 'transactions');
    return (
      <>
      <button onClick={this.onDayClick}>Day</button>
      <button onClick={this.onWeekClick}>Week</button>
      <button onClick={this.onMonthClick}>Month</button>
      {transactions.length ? transactions.map((el) => (
        <>
        <h4>{el.amount}</h4>
        </>
      )): <h4>No transactions found</h4>}
      </>
    )
  }
}
