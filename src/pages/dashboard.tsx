const Dashboard = () => {
  return (
    <div className="text-xl">
      <p>
        And it wouldn't work, visiting localhost:5173/src/fonts/OptimusPrinceps.ttf would download the file but the browser wouldn't display
        it. What fixed it was removing the explicit declaration, blind guess. However, this could be because of how this specific font works
        and has nothing to do with Vite.
      </p>
      <i className="fa-solid fa-truck text-3xl text-emerald-400"></i>
    </div>
  );
};

export default Dashboard;
