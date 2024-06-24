import { Link } from "react-router-dom";

const NavList = ({ goTop, data }) => {
  return (
    <ul className="flex gap-9 text-white text-[16px] font-medium xl:none">
      {data.map((item, index) => (
        <li
          key={index}
          style={{ transition: "all 0.3s" }}
          className="cursor-pointer hover:text-[#ff0336]"
        >
          {item.isLink ? (
            <Link onClick={goTop} to={item.href}>
              {item.text}
            </Link>
          ) : (
            <a href={item.href}>{item.text}</a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavList;
