const Header: React.FC = () => {
  
  const url = "http://localhost:3000/calendary";

  return (
    <header>
      <div className="position_header">
        <div className="header_img">
          <div className="contain">
            <div className="header_title_contain">
              <h1 className="header_title">Jedyny taki salon </h1>
              <a href={url} className="header_text">
                Naciśnij aby sprawdzić terminy!
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
