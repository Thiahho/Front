import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaNpm,
  FaChrome,
  FaPaypal,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/", label: "Github" },
    {
      icon: FaLinkedin,
      url: "",
      label: "LinkedIn",
    },
    {
      icon: FaYoutube,
      label: "YouTube",
    },
    {
      icon: FaNpm,
      url: "https://www.npmjs.com/package/nextjs-toast-notify",
      label: "NPM",
    },
    { icon: FaChrome, url: "https://www.urianviera.com/", label: "Website" },
    {
      icon: FaPaypal,
      url: "https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE",
      label: "PayPal",
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start">
            <p className="mb-0">
              &copy; {currentYear}{" "}
              <a
                href="https://www.urianviera.com"
                className="text-white text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
                TIVBEXE
              </a>{" "}
              || Todos los derechos reservados.
            </p>
          </div>

          <div className="col-12 col-md-6 text-center text-md-end">
            <div className="social-icons">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  className="text-white"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
