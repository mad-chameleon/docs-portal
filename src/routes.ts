const baseUrl = 'https://test.v5.pryaniky.com';
export default {
  profilePagePath: () => '/',
  loginPagePath: () => '/login',

  baseUrl: () => baseUrl,

  signIn: () => ['ru', 'data', 'v3', 'testmethods', 'docs', 'login'].join('/'),
  tableData: () => ['ru', 'data', 'v3', 'testmethods', 'docs', 'userdocs', 'get'].join('/'),
  addRow: () => ['ru', 'data', 'v3', 'testmethods', 'docs', 'userdocs', 'create'].join('/'),
  deleteRow: (id: string) => ['ru', 'data', 'v3', 'testmethods', 'docs', 'userdocs', 'delete', `${id}`].join('/'),
  editRow: (id: string) => ['ru', 'data', 'v3', 'testmethods', 'docs', 'userdocs', 'set', `${id}`].join('/'),
};
