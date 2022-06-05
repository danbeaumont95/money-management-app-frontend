import React, { Component } from 'react';
import '../Styles/LinkedAccount.css'
import Swal from 'sweetalert2';
import UserService from '../services/user';
import getSymbolFromCurrency from 'currency-symbol-map';
import { FaHourglassStart, FaMoneyCheckAlt } from 'react-icons/fa';
import moment from 'moment';

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

interface FormattedDateData {
  account_id: string;
amount: number;
category: IArrayOfStrings
merchant_name: any;
name:  string;
pending: boolean;
transaction_code: string;
transaction_type:  string;
payment_channel: string;
iso_currency_code: string
}

interface FormattedDate {
  date: string;
  data: Array<FormattedDateData>;
}

type State = {
  transactions: Array<Transaction>;
  formattedDates: Array<FormattedDate>;
  inboundOutbound: string;
}
type Props = {}

const formatTransactionsByDate = (arr: Array<Transaction>) => {
  const result = arr.reduce(
    (
      transaction: any,
      {
        date,
        pending,
        account_id,
        amount,
        category,
        name,
        merchant_name,
        transaction_code,
        transaction_type,
        payment_channel,
        iso_currency_code
      }: { date: string; pending: boolean,account_id: string, amount: number, category: IArrayOfStrings,name: string, merchant_name: string, transaction_code: string,transaction_type: string, payment_channel: string, iso_currency_code: string}
    ) => {
      let match = transaction.find((e: any) => e.date === date);
      if (match) {
        match.data.push({
          pending,
          account_id,
          amount,
          category,
          name,
          merchant_name,
          transaction_code,
          transaction_type,
          payment_channel,
          iso_currency_code
        });
      } else {
        match = {
          date,
          data: [
            {
              pending,
              account_id,
              amount,
              category,
              name,
              merchant_name,
              transaction_code,
              transaction_type,
              payment_channel,
              iso_currency_code
            }
          ]
        };
        transaction.push(match);
      }
      return transaction;
    },
    []
  );
  return result;
}

export default class LinkedAccount extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      transactions: [],
      formattedDates: [],
      inboundOutbound: 'all'
    }
    this.onDayClick = this.onDayClick.bind(this)
    this.onWeekClick = this.onWeekClick.bind(this)
    this.onMonthClick = this.onMonthClick.bind(this)
    this.onInboundClick = this.onInboundClick.bind(this);
    this.onAllClick = this.onAllClick.bind(this);
    this.onOutboundClick = this.onOutboundClick.bind(this);
  }
  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken')

    UserService.getAllTransactions(accessToken, 'week')
      .then((res) => {
        if (res.data.transactions) {
          this.setState({transactions: res.data.transactions})
          this.setState({formattedDates: formatTransactionsByDate(res.data.transactions)})
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
          // const differentDates: any = [...new Set(res.data.transactions.map((el: Transaction) => el.date))]
       
          this.setState({formattedDates: formatTransactionsByDate(res.data.transactions)})
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
         
          this.setState({formattedDates: formatTransactionsByDate(res.data.transactions)})
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
          this.setState({formattedDates: formatTransactionsByDate(res.data.transactions)})

        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Unable to fetch transactions, please try again later'
          })
        }
      })
  }

  onInboundClick = () => {
    const { transactions } = this.state
    const mappedTransactions = transactions.filter((el) => el.amount > 0);
    this.setState({formattedDates: formatTransactionsByDate(mappedTransactions)})
  }
  onAllClick() {
    const { transactions } = this.state
    this.setState({formattedDates: formatTransactionsByDate(transactions)})
  }
  onOutboundClick = () => {
    const { transactions } = this.state
    const mappedTransactions = transactions.filter((el) => el.amount < 0);
    this.setState({formattedDates: formatTransactionsByDate(mappedTransactions)})
  }
  render() {
    const { transactions, formattedDates } = this.state;

    return (
      <>
      <button onClick={this.onDayClick} style={{marginRight: '10px'}}>Day</button>
      <button onClick={this.onWeekClick} style={{marginRight: '10px'}}>Week</button>
      <button onClick={this.onMonthClick}>Month</button>

      <div className='typeOfTransactions'>
        <button onClick={this.onInboundClick} style={{marginRight: '5px'}}>Inbound</button>
        <button onClick={this.onAllClick}  style={{marginRight: '5px'}}>All</button>
        <button onClick={this.onOutboundClick}  style={{marginRight: '5px'}}>Outbound</button>
      </div>
      <div className='allTransactionContainer'>

      
        {transactions.length ? formattedDates.map((el: FormattedDate) => {
          return (
            <>
              <h4 style={{marginTop: '40px', textDecoration: 'underline'}}>{moment(el.date).format('MMMM Do YYYY')}</h4>
                {el.data.map((el) => (
                <div className='transactionCard'>
                  <div className='name'>

                    <h4>{el.name ? el.name : el.merchant_name}</h4>
                  </div>
                  <div className='amount'>

                    <h4>{getSymbolFromCurrency(el.iso_currency_code)}{el.amount}</h4>
                  </div>

                  <div className='category'>
                    <h4>{el.category.join(', ')}</h4>
                  </div>
                  
                  <div className='paymentChannel'>
                    <h4>{el.payment_channel}</h4>
                  </div>

                </div>
              ))}

            </>
          )
        }): <h4>No transactions found</h4>}
      
      </div>
      </>
    )
  }
}