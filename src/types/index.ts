export type APIError = {
    id: string,
    message: string,
}

export enum ConnectFormFields {
    teamsChannelUrl = 'teamsChannelUrl',
    mattermostChannelURL = 'mattermostChannelURL'
}
