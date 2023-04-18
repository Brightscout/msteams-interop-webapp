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
    subscriptionId: string,
    clientState: string,
    teamsTeamId: string,
    teamsTeamName: string,
    teamsChannelId: string,
    teamsChannelName: string,
    mmTeamName: string,
    mmChannelId: string,
    mmChannelName: string,
    mmUserId: string,
}

export type ConnectedChannelTableData = {
    key: number;
    items: ({content: string | JSX.Element})[];
}
