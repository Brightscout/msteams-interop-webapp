const getBaseUrl = (): string => {
    const url = window.location.href.split('plugins')[0];
    return url.substring(0, url.length - 1);
};

export default {getBaseUrl};
