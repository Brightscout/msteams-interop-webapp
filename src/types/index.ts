export type APIError = {
    id: string,
    message: string,
}

export const ConnectFormFields = {
    teamsChannelUrl: 'teamsChannelUrl',
    mattermostChannelURL: 'mattermostChannelURL',
};

export type ConnectFormFieldsType = typeof ConnectFormFields[keyof typeof ConnectFormFields]

export type ConnectedChannelData = {
    SubscriptionID: string,
    ClientState: string,
    TeamsTeamID: string,
    TeamsTeamName: string,
    TeamsChannelID: string,
    TeamsChannelName: string,
    MMTeamName: string,
    MMChannelID: string,
    MMChannelName: string,
    MMUserID: string,
}

export type ConnectedChannelTableData = {
    key: number;
    items: ({content: string | JSX.Element})[];
}
