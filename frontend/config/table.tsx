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
  { key: 'login', title: 'User Login' },
  { key: 'line_count', title: 'Line Count' },
];