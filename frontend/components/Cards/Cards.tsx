import * as styles from './Cards.styles';
import Card from '../Card/Card';
import { useContext } from 'react';
import { UiContext } from '../../contexts/UiContext';

function Cards({ repositories }) {
  const { isOpen } = useContext(UiContext);

  return (
    <styles.Cards open={isOpen}>
      {
        repositories.map((repo) => (<Card  key={repo.id} id={repo.id} repoName={repo.full_name} language={repo.language} description={repo.description} contributorsCount={repo.contributorsCount} stars={repo.stargazers_count} owner={repo.owner}/>))
      }
    </styles.Cards>
  );
}

export default Cards;