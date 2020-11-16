const initialState = {};

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

export default app;
