export const ConnectFormFields = {
    teamsChannelUrl: 'teamsChannelUrl',
    mattermostChannelURL: 'mattermostChannelURL',
};

export type ConnectFormFieldsType = typeof ConnectFormFields[keyof typeof ConnectFormFields]
