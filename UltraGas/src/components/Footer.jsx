import "../components/Footer.css";

/* Ícone de relógio */
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="18" height="18">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* Ícone de caminhão */
const IconTruckSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="18" height="18">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

/* Ícone de sustentabilidade */
const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="18" height="18">
    <path d="M12 22V12M12 12C12 7 17 2 22 2c0 5-5 10-10 10zM12 12C12 7 7 2 2 2c0 5 5 10 10 10z" />
  </svg>
);

/* Ícone de inovação */
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="18" height="18">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

/* Informações exibidas no rodapé */
const items = [
  {
    icon: <IconClock />,
    title: (
      <>
        Confiança que vem
        <br />
        de longe
      </>
    ),
    subtitle: "Mais de 85 anos de história",
  },
  {
    icon: <IconTruckSmall />,
    title: (
      <>
        Presente em todo
        <br />
        o Brasil
      </>
    ),
    subtitle: "Energia para milhões de lares",
  },
  {
    icon: <IconLeaf />,
    title: (
      <>
        Sustentabilidade
        <br />
        que transforma
      </>
    ),
    subtitle: "Compromisso com o futuro",
  },
  {
    icon: <IconZap />,
    title: (
      <>
        Inovação que
        <br />
        facilita sua vida
      </>
    ),
    subtitle: "Tecnologia a serviço de você",
  },
];

function Footer() {
  return (
    <div className="bottom-bar">

      {/* Percorre todos os itens do rodapé */}
      {items.map((item, i) => (
        <div className="bottom-bar-item" key={i}>

          {/* Separador entre os itens */}
          {i > 0 && <div className="bottom-bar-divider" />}

          {/* Ícone */}
          <div className="bicon">
            {item.icon}
          </div>

          {/* Texto */}
          <div className="btext">
            <strong>{item.title}</strong>
            <span>{item.subtitle}</span>
          </div>

        </div>
      ))}

    </div>
  );
}

export default Footer;