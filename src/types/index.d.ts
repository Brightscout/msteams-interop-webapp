type APIError = {
    id: string,
    message: string,
}

type ConnectedChannelData = {
    subscriptionId: string,
    clientState: string,
    teamsTeamId: string,
    teamsTeamName: string,
    teamsChannelID: string,
    teamsChannelName: string,
    mmTeamName: string,
    mmChannelId: string,
    mmChannelName: string,
    mmUserID: string,
}

type ConnectedChannelTableData = {
    key: number;
    items: ({content: string | JSX.Element})[];
}
