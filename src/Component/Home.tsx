import React, { Component } from 'react';
import Swal from 'sweetalert2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineController,
  BarElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import PacmanLoader from 'react-spinners/PacmanLoader';
import NavBar from './NavBar';
import '../Styles/Home.css';
import UserService from '../services/user';
import { Transaction } from './LinkedAccount';
import UtilFunctions from '../utils/utils';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineController,
  BarElement,
);

type Props = {};
type State = {
  transactions: Array<Transaction>;
  loading: boolean;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      transactions: [],
      loading: true,
    };
  }

  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken');

    UserService.getAllTransactions(accessToken, 'month')
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.data.transactions) {
          this.setState({ transactions: res.data.transactions });
          this.setState({ loading: false });
        } else {
          return Swal.fire({
            title: 'Error',
            text: 'Unable to fetch transactions, please try again later',
          });
        }
      });
  }

  render() {
    const { transactions, loading } = this.state;

    const getAmountSpentPerAmount = (arr: Array<Transaction>) => {
      const obj = {
        lessThan5: 0,
        lessThan10: 0,
        lessThan20: 0,
        lessThan30: 0,
        '30Plus': 0,
      };
      const allLessThan5 = arr.filter((el) => el.amount <= 5).length;
      const allLessThan10 = arr.filter((el) => el.amount <= 10).length;
      const allLessThan20 = arr.filter((el) => el.amount <= 20).length;
      const allLessThan30 = arr.filter((el) => el.amount <= 30).length;
      const allAbove = arr.filter((el) => el.amount > 30).length;

      obj.lessThan5 = allLessThan5;
      obj.lessThan10 = allLessThan10;
      obj.lessThan20 = allLessThan20;
      obj.lessThan30 = allLessThan30;
      obj['30Plus'] = allAbove;
      return Object.values(obj);
    };
    const paymentChannelData = {
      labels: ['in store', 'online'],
      datasets: [
        {
          label: 'Payment Channel',
          data: [transactions.filter((el) => el.payment_channel === 'in store').length, transactions.filter((el) => el.payment_channel === 'online').length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const amountSpentData = {
      labels: ['Less than £5', '£5-£10', '£10-£20', '£20-£30', '£30+'],
      datasets: [{
        label: 'Amount of Transaction in amount range',
        data: getAmountSpentPerAmount(transactions),
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderWidth: 1,
      }],
    };

    const transactionsByCategoryData = {
      labels: UtilFunctions.getMostCommonTransactionCategories(transactions)
        .slice(0, 5).map((el) => Object.entries(el)[0][1]),
      datasets: [
        {
          label: 'Payment Channel',
          data: UtilFunctions.getMostCommonTransactionCategories(transactions)
            .slice(0, 5).map((el) => Object.entries(el)[1][1]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(80, 30, 235, 0.2)',
            'rgba(120, 200, 125, 0.2)',
            'rgba(190, 120, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(80, 30, 235, 1)',
            'rgba(120, 200, 125, 1)',
            'rgba(190, 120, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    if (loading) {
      return (
        <div style={{ border: '2px solid red' }}>
          <PacmanLoader color="#36D7B7" loading={loading} size={15} />
          <br />
          <h2>Loading...</h2>
        </div>
      );
    }

    return (
      <>
        <NavBar />
        <h1>Home</h1>
        {transactions.length ? (
          <>
            <div className="paymentChannelChartContainer">
              <h4>Payment Channel</h4>
              <div className="paymentChannelChart">
                <Pie
                  data={paymentChannelData}
                  width="300px"
                  height="400px"
                  options={{ maintainAspectRatio: false, color: 'black' }}
                />

              </div>
            </div>
            <div className="amountOfTransactionsBySpendChartContainer">
              <h4>Amount spent in price range</h4>
              <div className="amountOfTransactionsBySpendChart">
                <Bar
                  data={amountSpentData}
                  width="300px"
                  height="400px"
                  options={{ maintainAspectRatio: false, color: 'black' }}
                />
              </div>
            </div>

            <div className="transactionsByCategoryChartContainer">
              <h4>Most common transaction categories</h4>
              <div className="transactionsByCategoryChart">
                <Pie
                  data={transactionsByCategoryData}
                  width="300px"
                  height="400px"
                  options={{ maintainAspectRatio: false, color: 'black' }}
                />
              </div>
            </div>

          </>
        ) : null}
      </>
    );
  }
}
