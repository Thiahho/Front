import Typewriter from "typewriter-effect";
import imgShopping from "../assets/imgs/ICO.png";

const TitleTypeWriter = () => {
  return (
    <section className="row align-items-center">
      <div className="col-12 col-md-7">
        <h1 className="display-5 titulo">
          Bienvenido a{" "}
          <span style={{ color: "#003092" }}>Origami Importados</span> 🛍️
        </h1>
        <h3 className="text-center">
          <Typewriter
            options={{
              strings: [
                "Smartphones 📱",
                "Consolas 🎮",
                "TV 📺",
                "Auriculares 🎧",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              delay: 75,
            }}
          />
        </h3>
      </div>
      <div className="col-12 col-md-5 text-center">
        <img
          style={{ width: "350px", maxWidth: "100%" }}
          src={imgShopping}
          alt="Tienda Tech"
          className="img-fluid text-center px-3"
        />
      </div>
    </section>
  );
};

export default TitleTypeWriter;
