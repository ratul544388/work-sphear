import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import Container from "./container";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white/80 mt-32">
      <Container className="grid max-w-7xl grid-cols-1 gap-8 py-10 md:grid-cols-3">
        <div>
          <Logo invert size="sm" className="mb-3 text-white" />
          <p className="text-sm">
            Simplifying service bookings for everyone. Discover providers,
            manage your appointments, and get things done effortlessly with
            ServiceNow.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-primary mb-3 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/#" className="hover:text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link to="/#" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-primary mb-3 font-semibold">Connect With Us</h4>
          <div className="flex items-center space-x-4 text-xl">
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="mailto:support@servicenow.com"
              className="hover:text-primary"
            >
              <FaEnvelope />
            </Link>
          </div>
          <p className="mt-3 text-xs">support@worksphear.com</p>
        </div>
      </Container>
      <div className="border-t border-blue-950 py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} ServiceNow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
