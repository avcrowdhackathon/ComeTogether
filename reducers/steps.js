const initialData = {
    stepsSeen: false
}
  
export default  privateKeyReducer = (prevState = initialData, action) => {
    switch (action.type) {
    case 'SET_STEPS':
        return {
        ...prevState,
        stepsSeen: action.stepsSeen,
        };
    default:
        return prevState;  
    }
}