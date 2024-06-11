import { INIT_ELEMENT, UPDATE_ELEMENT_BY_IDX } from "@/store/constants/element";
import { Element } from "@/types/element";
import { Action } from "@/types/reduxType";

const initialValue: Array<Element> = [];

const elementReducer = (state = initialValue, action: Action<Element>) => {
  const { type, payload } = action;

  if (type === INIT_ELEMENT) {
    return payload;
  } else if (type === UPDATE_ELEMENT_BY_IDX) {
    const { idx, data } = payload;
    state[idx] = data;
    return [...state];
  } else {
    return state;
  }
};

export default elementReducer;
