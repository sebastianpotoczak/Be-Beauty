import photoSection from "./../assets/Header.jpeg";

const AboutMe: React.FC = () => {
  return (
    <>
      <section>
        <div className="contain">
          <div className="section_contain">
            <div className="section_text">
              <h1>about the studio</h1>
              <br></br>
              <br></br>
              <h2>Welcome friend.</h2>
              <br></br>
              <br></br>
              <h3>
                Wierzymy, że piękno nie zna wieku. Wierzymy, że każda kobieta
                bez względu na wiek może być szczupła, doskonale wyglądać i być
                pewna siebie, swej urody i wdzięku. Uważamy, że kobiece ciało to
                świątynia dla duszy, która bije blaskiem, gdy o nią właściwie
                zadbamy. Wiemy, że 10 lat doświadczenia w branży beauty,
                stosowania najnowocześniejszych technologii oraz zdobywania
                unikalnej wiedzy, pozwala nam na osiąganie ponadprzeciętnych
                efektów pielęgnacyjnych i terapeutycznych. Gwarantujemy naszym
                klientkom nową jakość funkcjonowania…
              </h3>
              <br></br>
              <br></br>
              <div className="contact_section" id="contact">
                <a href="tel:+496170961709" className="Blondie">
                  tel: 123456789
                </a>
                <br></br>
                <a href="mailto:studio@gmail.com">studio@gmail.com</a>
              </div>
            </div>
            <img src={photoSection} alt="Rainbow girl" />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
