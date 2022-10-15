import ReactGA from 'react-ga4';
export const TRACKING_CATEGORY = {
  LOGIN: 'login',
  EMAIL_LINK: 'Email Link',
  PHONE_LINK: 'Phone Link',
  TELEGRAM_LINK: 'Telegram Link',
  SUBSCRIBE: 'Subscribe'
}
export const EMAIL_LINK_ACTION = {
  ENTER: 'Enter Email',
}
export const PHONE_LINK_ACTION = {
  ENTER: 'Enter Phone Number',
}
export const TELEGRAM_LINK_ACTION = {
  ENTER: 'Enter Telegram ID',
}
export const SUBSCRIBE_ACTION = {
  ETH_MAINNET: 'Subscribe ETH_MAINNET',
  ETH_RINKEBY: 'Subscribe ETH_RINKEBY',
  MATIC_MAINNET: 'Subscribe MATIC_MAINNET',
  MATIC_MUMBAI: 'Subscribe MATIC_MUMBAI',
  ARB_MAINNET: 'Subscribe ARB_MAINNET',
  ARB_RINKEBY: 'Subscribe ARB_RINKEBY',
  OPT_MAINNET: 'Subscribe OPT_MAINNET',
  OPT_KOVAN: 'Subscribe OPT_KOVAN',
}
const useAnalyticsEventTracker = () => {
    const eventTracker = (category, action, label) => {
      ReactGA.event({category, action, label});
    }
    return eventTracker;
  }
export default useAnalyticsEventTracker;