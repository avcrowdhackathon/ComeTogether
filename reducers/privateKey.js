const initialData = {
    privateKey: undefined
}
  
export default  privateKeyReducer = (prevState = initialData, action) => {
    switch (action.type) {
    case 'SET_PRIVATE_KEY':
        return {
        ...prevState,
        privateKey: action.privateKey,
        };
    default:
        return prevState;  
    }
}