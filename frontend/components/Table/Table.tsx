import * as styles from './Table.styles';

export default function Table({ columns, list }) {
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
          {
            list.map((row, index) => (
              <tr key={index}>
                {
                  columns.map((column, index) => (
                    <td key={index}>{row[column.key]}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody >
      </styles.Table>
    </styles.TableContainer>
  );
}