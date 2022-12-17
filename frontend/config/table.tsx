export interface ITableColumn {
  title: string;
  key: string;
}


export const usersTableColumns: ITableColumn[] = [
  { key: 'avatar', title: 'Avatar' },
  { key: 'login', title: 'Login' },
  { key: 'type', title: 'Type' },
];

export const contributionsTableColumns: ITableColumn[] = [
  { key: 'id', title: 'Id' },
  { key: 'avatar', title: 'Avatar' },
  { key: 'login', title: 'User Login' },
];