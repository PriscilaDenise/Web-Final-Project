import { Link, useNavigate } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import { useState } from 'react';
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const NavbarComponent = ({ isAuthenticated, userRole, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-primary-500 text-white">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/" className="font-bold text-xl">
            Daycare Center
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link to={item.path} className="hover:text-primary-200">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            <NavbarItem>
              <Button
                as={Link}
                to={`/${userRole}/dashboard`}
                color="primary"
                variant="flat"
                startContent={<FaUser />}
              >
                Dashboard
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="danger"
                variant="flat"
                onClick={handleLogout}
                startContent={<FaSignOutAlt />}
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              to="/login"
              color="primary"
              variant="flat"
              startContent={<FaSignInAlt />}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              to={item.path}
              className="w-full text-white hover:text-primary-200"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent; 