import "../resources/styles/HeaderNav.c.css";

export const HeaderNav = () => {
  return (
    <div className="header-nav">
      <img
        src="/school-badge.jpg"
        alt="Shatin Pui Ying College"
        style={{ height: "2.5em" }}
      />
      <div className="header-nav-title">Go School Safe</div>
    </div>
  );
};

export default HeaderNav;
