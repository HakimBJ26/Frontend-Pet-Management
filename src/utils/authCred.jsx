import { SIGN_IN_PATH, SIGN_UP_PATH, SUBMIT_VETO_REQUEST } from "../common/configuration/constants/Paths";

export const getAuthInfo = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return { token, role };
  };
  

  export const shouldShowTopBar = (pathname) => {
    return pathname !== `${SIGN_IN_PATH}` && pathname !== `${SIGN_UP_PATH}`   && pathname !== `${SUBMIT_VETO_REQUEST}`;
  };
  
  export const shouldShowSideBar = (pathname) => {
    return pathname !== `${SIGN_IN_PATH}` && pathname !== `${SIGN_UP_PATH}`  && pathname !== `${SUBMIT_VETO_REQUEST}`;
  };
  
