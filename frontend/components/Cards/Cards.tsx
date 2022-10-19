import * as styles from './Cards.styles';
import Card from '../Card/Card';
import { IRepository } from '../../models/Repository';
import { useAppSelector } from '../../store/hooks';
import { selectIsSidebarOpen } from '../../store/store';

interface Props {
  repositories: IRepository[];
}

function Cards({ repositories }: Props) {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);


  return (
    <styles.Cards open={isSidebarOpen}>
      {
        repositories.map((repo) => (<Card key={repo.id} id={repo.id} repoName={repo.full_name} language={repo.language} description={repo.description} contributorsCount={repo.contributorsCount} stars={repo.stargazers_count} owner={repo.owner} />))
      }
    </styles.Cards>
  );
}

export default Cards;