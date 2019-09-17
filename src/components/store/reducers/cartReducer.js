const initialState = {
    list: [],
    // counter: 0

}
export default function (state = initialState, action){
    switch(action.type){
        case "ADD_TO_LIST":
           const productPut = {
               id: action.payload,
               amount: 1,
           } 
           let putInBasket = true;
           const newBasket = [...state.list];
           for(let i=0; i<newBasket.length; i++){
               if(newBasket[i].id === productPut.id){
                   newBasket[i].amount++;
                   putInBasket = false;
                   break;
               }
           }
           if(putInBasket){
               newBasket.push(productPut);
           }
           return {
               ...state,
               list: newBasket
           };

            // state.list.push(action.payload)
            // console.log(state);
            // return state ; 

         case "REMOVE_FROM_LIST":

            // console.log('before');
            // console.log(state.list);
            // console.log(`payload: ${action.payload}`)

            const newList = state.list.filter((element) => {
                return element.id !== action.payload;
            });
            // console.log('after');
            // console.log(newList);
            return {
                list: newList
            }
            
         case "DECREASE_AMOUNT":

             let basketList = [...state.list];
             let productIndex = -1;
             for(let i=0; i<basketList.length; i++){
                 if(basketList[i].id === action.payload ){
                     productIndex = i;
                 }
             }
             basketList[productIndex].amount--;
             if(basketList[productIndex].amount === 0){
                basketList =  basketList.filter((el) => {
                     return el.id !== action.payload;
                 })
             }
             return {
                 ...state,
                list: basketList
             }

         case "CHANGE_AMOUNT":
             let anotherList = [...state.list];
             let anotherId =-1;
             for(let i=0; i<anotherList.length; i++){
                 if(anotherList[i].id === action.payload.productId){
                     anotherId = i;
                 }
             }
            //  console.log(action.payload)
            //  console.log(anotherList);
            //  console.log(anotherId);
             anotherList[anotherId].amount = action.payload.amount;
             return {
                 ...state,
                 list: anotherList
             }    
        default:
            // console.log('net asda')
            return state;   
    }
}
