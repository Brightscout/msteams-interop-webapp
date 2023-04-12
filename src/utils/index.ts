import {ENV_VARIABLES} from '../constants';

const getBaseUrls = (): {mattermostServer: string, plugin: string} => {
    const url = window.location.href.split('plugins')[0];
    const mattermostServer = url.substring(0, url.length - 1);
    const plugin = `${mattermostServer}/plugins/${ENV_VARIABLES.PLUGIN_ID}/api/v1/teams`;

    return {mattermostServer, plugin};
};

export default {getBaseUrls};
