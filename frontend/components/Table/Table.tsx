import * as styles from './Table.styles';
import Link from 'next/link';
import { ITableColumn } from '../../config/table';

interface Props { columns: ITableColumn[]; list: any[]; toHref: string; objectKey: string; }

export default function Table({ columns, list, toHref, objectKey }: Props) {
  const isEmpty = !list.length;

  return (
    <styles.TableContainer>
      <styles.Table>
        <thead>
          <tr>
            {
              columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {isEmpty && <tr><td style={{ borderRadius: "0 0 25px 25px" }} colSpan={columns.length}>No data</td></tr>}
          {!isEmpty && list.map((row, rowIndex) => (
            <Link key={row['id']} as={`/users/${row[objectKey]}`} href={toHref}>
              <tr style={{ cursor: 'pointer' }}>
                {
                  columns.map((column, columnIndex) => (
                    <td key={rowIndex + columnIndex}>{row[column.key]}</td>
                  ))
                }
              </tr>
            </Link>))
          }
        </tbody >
      </styles.Table>
    </styles.TableContainer >
  );
}