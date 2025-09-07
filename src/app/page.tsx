import Algolia from "./components/Algolia";
import CafeSessions from "./components/CafeSessions";

export default function Home() {
  return (
    <>
      <CafeSessions />
      <Algolia />
    </>
  );
}
