import {PLUGIN_ID} from '../constants';

const getBaseUrls = (): {mattermostServer: string, plugin: string} => {
    const url = window.location.href.split('plugins')[0];
    const mattermostServer = url.substring(0, url.length - 1);
    const plugin = `${mattermostServer}/plugins/${PLUGIN_ID}/api/v1/teams`;

    return {mattermostServer, plugin};
};

export default {getBaseUrls};
