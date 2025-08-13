import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import "./App.css";

export default function App() {
  // Sidebar width and bar settings
  //const sidebarWidth = 300;
  const barWidth = 500;
  const barHeight = 37;
  const barX = 710;
  const barY = 654;

  return (
    <div className="app">
      <MainContent
        barWidth={barWidth}
        barHeight={barHeight}
        barX={barX}
        barY={barY}
      />
      <TopBar />
      <Sidebar />
    </div>
  );
}
