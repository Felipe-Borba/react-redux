import { all, call, put, select, takeLatest } from "redux-saga/effects";
import api from "../../../services/api";
import { addReserveSuccess, updateAmountSuccess } from "./actions";

function* addToReserve({ id }) {
  const tripsExists = yield select((state) =>
    state.reserve.find((trip) => trip.id === id)
  );

  const myStock = yield call(api.get, `/stock/${id}`);
  const stockAmount = myStock.data.amount;

  const currentStock = tripsExists ? tripsExists.amount : 0;

  const amount = currentStock + 1;

  if (amount > stockAmount) {
    alert("Quantidade máxima atingida");
    return;
  }

  if (tripsExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `trips/${id}`);

    const data = {
      ...response.data,
      amount: 1,
    };
    yield put(addReserveSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const myStock = yield call(api.get, `/stock/${id}`);
  const stockAmount = myStock.data.amount;

  if (amount > stockAmount) {
    alert("Quantidade máxima atingida");
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest("ADD_RESERVE_REQUEST", addToReserve),
  takeLatest("UPDATE_RESERVE_REQUEST", updateAmount),
]);
