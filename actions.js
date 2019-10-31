const SET_SPEED = 'SET_SPEED';

export const setSpeed = payload => ({
  type: SET_SPEED,
  payload,
});

const INITIAL_STATE = 1000;

export function speedReducer(state = INITIAL_STATE, { type, payload }) {
  switch(type) {

    case SET_SPEED:
      return payload;

    default:
      return state;
  }
}
