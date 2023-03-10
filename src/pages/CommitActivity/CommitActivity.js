import ChangesDropdown from "../../components/graph/ChangesDropdown";
import ContributorChangesGraph from "../../components/graph/ContributorChangesGraph";
import TotalChangesGraph from "../../components/graph/TotalChangesGraph";
import { useParams } from "react-router-dom";

function CommitActivity() {
  const { user, repo } = useParams();

  return (
    <>
      <ChangesDropdown />
      <TotalChangesGraph user={user} repo={repo} />
      <ContributorChangesGraph user={user} repo={repo} />
    </>
  );
}

export default CommitActivity;
