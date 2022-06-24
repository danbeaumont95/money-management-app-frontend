/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
import { Transaction } from '../Component/LinkedAccount';

const getMostCommonTransactionCategories = (arr:Array<Transaction>) => {
  const amountOfTimesCategoryAppears = arr
    .map((el) => el.category)
    .flat()
    .reduce(
      // eslint-disable-next-line no-return-assign
      (acc: {
        [key: string]: number
      }, curr: string) => (
        // eslint-disable-next-line no-plusplus
        // eslint-disable-next-line no-sequences
        acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc
      ),
      {},
    );

  const sortedArray = Object.entries(amountOfTimesCategoryAppears)
    .map((el) => {
      const obj: any = {};
      obj.name = el[0];
      obj.amount = el[1];
      return obj;
    })
    .sort((a, b) => (a.amount > b.amount ? -1 : 1));

  return sortedArray;
};

const generateRandomUserName = (email: string) => email.slice(0, email.indexOf('@')) + Math.floor(Math.random() * 300 + 100);

const UtilFunctions = {
  getMostCommonTransactionCategories,
  generateRandomUserName,
};

export default UtilFunctions;
