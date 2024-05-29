import NewSwarmModal from "./components/NewSwarmModal";
import SwarmLog from "./components/SwarmLog";

const App = () => {
  return (
    <div class="m-10 h-screen flex flex-col sm:flex-row items-center justify-center">
      <NewSwarmModal />
      <SwarmLog />
    </div>
  );
};

export default App;
