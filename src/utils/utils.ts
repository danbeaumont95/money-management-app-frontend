import { Transaction } from "../Component/LinkedAccount";

const getMostCommonTransactionCategories = (arr:Array<Transaction>) => {
  const amountOfTimesCategoryAppears = arr
    .map((el) => el.category)
    .flat()
    .reduce(
      (acc: { [key: string]: number }, curr: string) => (acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc),
      {}
    );

  const sortedArray = Object.entries(amountOfTimesCategoryAppears)
    .map((el) => {
      const obj: any = {};
      obj["name"] = el[0];
      obj["amount"] = el[1];
      return obj;
    })
    .sort((a, b) => (a.amount > b.amount ? -1 : 1));

  return sortedArray;
};

const UtilFunctions = {
  getMostCommonTransactionCategories
};

export default UtilFunctions
