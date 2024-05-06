import routes from "@/constants/routes";
import Link from "next/link";

const links = [
  { name: "Вопросы", href: routes.questions },
  { name: "Шаблоны", href: routes.templates },
  { name: "Интервью", href: routes.interviews },
  { name: "Кандидаты", href: routes.candidates },
];

export default function NavLinks() {
  return links.map(({ name, href }) => (
    <Link className="text-gray-600 hover:text-gray-900" href={href} key={name}>
      {name}
    </Link>
  ));
}
