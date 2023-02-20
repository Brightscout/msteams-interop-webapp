type APIError = {
    id: string,
    message: string,
}

type ConnectedChannelData = {
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

type ConnectedChannelTableData = {
    key: number;
    items: ({content: string | JSX.Element})[];
}
