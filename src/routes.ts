const baseUrl = 'https://test.v5.pryaniky.com'
;
export default {
    profilePagePath: () => '/',
    loginPagePath: () => '/login',

    baseUrl: () => baseUrl,

    signIn: () => ['ru', 'data', 'v3', 'testmethods', 'docs', 'login'].join('/'),
    tableData: () => ['ru', 'data', 'v3', 'testmethods', 'docs', 'login', 'userdocs', 'get'].join('/'),
    addRow: () =>  ['ru', 'data', 'v3', 'testmethods', 'docs', 'login', 'userdocs', 'create'].join('/'),
    deleteRow: (id: number) => ['ru', 'data', 'v3', 'testmethods', 'docs', 'login', 'userdocs', 'delete', `${id}`].join('/'),
    editRow: (id: number) => ['ru', 'data', 'v3', 'testmethods', 'docs', 'login', 'userdocs', 'set', `${id}`].join('/'),
};
