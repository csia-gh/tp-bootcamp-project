import * as styles from './Card.styles';
import Link from 'next/link';
import { FaDatabase, FaKeyboard, FaStar } from 'react-icons/fa';

function Card({ id, repoName, description, language, contributorsCount, stars, owner }) {
  return (
    <Link as={`/repositories/${id}`} href="/repositories/[id]">
      <styles.Card>
        <styles.CardHeader>
          <FaDatabase style={{ fontSize: '45px' }} />
          <div>
            <span style={{ fontSize: '28px', fontWeight: '600' }}>
              {repoName.split('/')[1]}
            </span>
          </div>
        </styles.CardHeader>
        <styles.CardContent>
          <h2><span>Owner:</span> {owner.login}</h2>
          {description}
        </styles.CardContent>
        <styles.CardFooter>
          <styles.CardFooterLeft>
            <div>
              <FaKeyboard style={{ marginRight: '0.5rem' }} /> {language}
            </div>
            <div>
              <FaStar style={{ color: '#73D597', marginRight: '0.5rem' }} />{' '}
              {stars}
            </div>
          </styles.CardFooterLeft>
          <styles.CardFooterRight>
            Contributors: <span>{contributorsCount}</span>
          </styles.CardFooterRight>
        </styles.CardFooter>
      </styles.Card>
    </Link>
  );
}

export default Card;
