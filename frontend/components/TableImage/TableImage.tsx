import * as styles from './TableImage.styles';

export interface TableImageProps {
  src: string;
  alt: string;
}

const TableImage: React.FC<TableImageProps> = ({ src, alt }) => {
  return <styles.TableImage src={src} alt={alt} />;
};

export default TableImage;