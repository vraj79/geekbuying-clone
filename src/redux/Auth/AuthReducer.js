import * as types from "./AuthActionTypes";

const initialState = {
  name: null, //For displaying the login user name
  mobile_number: null, //required for order place
  address: {
    pincode: null,
    locality: null,
    city: null,
    state: null,
  }, //For order placing
  isError: false,
};

const Authreducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.UPDATE_ADDRESS:
      const { name, mobile, pincode, locality, city, state_ut } = payload;
      return {
        ...state,
        name: name,
        mobile_number: mobile,
        address: {
          pincode: pincode,
          locality: locality,
          city: city,
          state: state_ut,
        },
      };

    case "EMAIL_LOGIN_REQUEST":
        return {...state, AuthLoading:true};

    case "EMAIL_LOGIN_SUCCESS":
      const {address:getAddress}=payload;
      return { ...state, name: payload.displayName, userId: payload.uid,cart:payload.bag, mobile_number:payload.phone,address:getAddress, AuthLoading:false  };

    case "EMAIL_LOGIN_FAILURE":
      return {...state, isError:true}

    case "GOOGLE_LOGIN_REQUEST":
      return {...state, AuthLoading:true}

    case "GOOGLE_LOGIN_SUCCESS":
      const {address:getGoogleAddress}=payload;
      return {...state, name: payload.displayName, userId: payload.uid, mobile_number:payload.phone, address:getGoogleAddress, isLoading:false}
    
    case "SIGN_UP_REQUEST":
      return {...state, AuthLoading:true}
    
    case "SIGN_UP_SUCCESS":
      return {...state, AuthLoading:false,name: payload.displayName, userId: payload.uid }
   
    case "SIGN_UP_FAILURE":
      return {...state, AuthLoading:false,isError: true}
      
    default:
      return state;
  }
};

export {Authreducer}