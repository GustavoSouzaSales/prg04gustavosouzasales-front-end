import "../components/Footer.css";

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--neon,#00aaff)" strokeWidth="2" width="17" height="17">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconTruckSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--neon,#00aaff)" strokeWidth="2" width="17" height="17">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00e5b4" strokeWidth="2" width="17" height="17">
    <path d="M12 22V12M12 12C12 7 17 2 22 2c0 5-5 10-10 10zM12 12C12 7 7 2 2 2c0 5 5 10 10 10z" />
  </svg>
);

const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--neon,#00aaff)" strokeWidth="2" width="17" height="17">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const items = [
  {
    icon: <IconClock />,
    title: <><span>Confiança que vem</span><span>de longe</span></>,
    subtitle: "Mais de 85 anos de história",
    accent: "neon",
  },
  {
    icon: <IconTruckSmall />,
    title: <><span>Presente em todo</span><span>o Brasil</span></>,
    subtitle: "Energia para milhões de lares",
    accent: "neon",
  },
  {
    icon: <IconLeaf />,
    title: <><span>Sustentabilidade</span><span>que transforma</span></>,
    subtitle: "Compromisso com o futuro",
    accent: "teal",
  },
  {
    icon: <IconZap />,
    title: <><span>Inovação que</span><span>facilita sua vida</span></>,
    subtitle: "Tecnologia a serviço de você",
    accent: "neon",
  },
];

function Footer() {
  return (
    <div className="bottom-bar">
      {items.map((item, i) => (
        <div className={`bottom-bar-item bottom-bar-item--${item.accent}`} key={i}>
          {i > 0 && <div className="bottom-bar-divider" />}
          <div className="bicon">{item.icon}</div>
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