import { Link } from "react-router-dom";
export const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to} className="hover:text-isotope-teal transition-colors">{children}</Link>;
