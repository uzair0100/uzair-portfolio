import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

type Item = {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const items: Item[] = [
  { href: "https://www.facebook.com/wtsupjerry/", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://www.instagram.com/wtsupjerry/", label: "Instagram", Icon: FaInstagram },
];

export default function SocialFooter() {
  return (
    <div className="social-fx-wrap">
      <ul className="social-fx">
        {items.map(({ href, label, Icon }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon className="fa" />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
