import { ASK_TO_RESET_PASS, RESET_PASS_REQUEST, SIGN_IN_PATH, SIGN_UP_PATH, SUBMIT_VETO_REQUEST } from "../common/configuration/constants/Paths";

export const getAuthInfo = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return { token, role };
  };
  

  export const shouldShowTopBar = (pathname) => {
    return pathname !== `${SIGN_IN_PATH}` && pathname !== `${SIGN_UP_PATH}`   && pathname !== `${SUBMIT_VETO_REQUEST}` && pathname !== `${RESET_PASS_REQUEST}`  && pathname !== `${ASK_TO_RESET_PASS}`;
  };
  
  export const shouldShowSideBar = (pathname) => {
    return pathname !== `${SIGN_IN_PATH}` && pathname !== `${SIGN_UP_PATH}`  && pathname !== `${SUBMIT_VETO_REQUEST}` && pathname !== `${RESET_PASS_REQUEST}`   && pathname !== `${ASK_TO_RESET_PASS}`;
  };
  
