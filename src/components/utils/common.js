export const LINK_STATUS = {
    NOT_ENTERED: "NOT_ENTERED",
    UNVERIFIED: "UNVERIFIED",
    VERIFIED: "VERIFIED",
};
export const CHANNEL = {
    EMAIL: "email",
    TELEGRAM: "telegram",
    PHONE: "phone",
};
export  const showToast = (title, desc, toast, status) => {
    toast({
        title: title,
        description: desc,
        status: status,
        duration: 5000,
        isClosable: true,
    });
};
export const NETWORK = {
    ETH_MAINNET: 'ETH_MAINNET',
    ETH_RINKEBY: 'ETH_RINKEBY',
    MATIC_MAINNET: 'MATIC_MAINNET',
    MATIC_MUMBAI: 'MATIC_MUMBAI',
    ARB_MAINNET: 'ARB_MAINNET',
    ARB_RINKEBY: 'ARB_RINKEBY',
    OPT_MAINNET: 'OPT_MAINNET',
    OPT_KOVAN: 'OPT_KOVAN',
}
