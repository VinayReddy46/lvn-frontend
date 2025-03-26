/**
 * TeamSwitcher component for organization selection
 */
const TeamSwitcher = ({ teams = [] }) => {
  const { isMobile, open } = useSidebar();
  const isCollapsed = !open;
  const [activeTeam, setActiveTeam] = React.useState(
    teams[0] || { name: "Organization", plan: "Default" }
  );

  return (
    // Rest of the component code remains unchanged
  );
};

export default TeamSwitcher; 