
    export const addProduct = productId => dispatch => {
        dispatch({
          type: "ADD_TO_LIST",
          payload: productId
        });
      };

      export const removeProduct = productId => dispatch => {
        dispatch({
          type: "REMOVE_FROM_LIST",
          payload: productId
        });
      };

      export const decreaseAmount = productId => dispatch => {
          dispatch({
              type: "DECREASE_AMOUNT",
              payload: productId
          })
      }

      export const changeAmount = (productId, amount) => dispatch => {
          dispatch({
              type: "CHANGE_AMOUNT",
              payload: {productId, amount}
          })
      }

