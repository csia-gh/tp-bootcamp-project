import * as styles from './Card.styles';
import Link from 'next/link';
import { FaDatabase, FaKeyboard, FaStar } from 'react-icons/fa';

function Card({ id, repoName, description, language, contributions }) {
  return (
    <Link as={`/repositories/${id}`} href="/repositories/[id]">
      <styles.Card>
        <styles.CardHeader>
          <FaDatabase style={{ fontSize: '45px' }} />
          <div>
            <span style={{ fontSize: '28px', fontWeight: '600' }}>
              {repoName} #{id}
            </span>
            <span style={{ fontWeight: '400' }}>Owner</span>
          </div>
        </styles.CardHeader>
        <styles.CardContent>
          {description}
        </styles.CardContent>
        <styles.CardFooter>
          <styles.CardFooterLeft>
            <div>
              <FaKeyboard style={{ marginRight: '0.5rem' }} /> {language}
            </div>
            <div>
              <FaStar style={{ color: '#73D597', marginRight: '0.5rem' }} />{' '}
              1,4k
            </div>
          </styles.CardFooterLeft>
          <styles.CardFooterRight>
            Contributions: <span>{contributions}</span>
          </styles.CardFooterRight>
        </styles.CardFooter>
      </styles.Card>
    </Link>
  );
}

export default Card;
