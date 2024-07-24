import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAuthInfo } from '../../utils/authCred';
import { ROLE_CLIENT, ROLE_VETO } from '../../common/configuration/constants/UserRole';
import { clientLinks, vetoLinks, adminLinks } from '../../common/configuration/constants/navigationLinks';

function BottomBar() {
    const location = useLocation();
    const role = getAuthInfo().role;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const links = role === ROLE_CLIENT ? clientLinks : role === ROLE_VETO ? vetoLinks : adminLinks;
    const primaryLinks = links.slice(0, 4);
    const moreLinks = links.slice(4);

    return (
        <>
            <BottomNavigation
                showLabels
                value={location.pathname}
             className='bottom-navigation'
            >
                {primaryLinks.map((link, index) => (
                    <BottomNavigationAction
                        key={index}
                        component={Link}
                        to={link.to}
                        label={link.label}
                        icon={link.icon}
                        value={link.to}
                        className='bottom-navigation-action'
                    />
                ))}
                {moreLinks.length > 0 && (
                    <BottomNavigationAction
                        label="More"
                        icon={<MoreVertIcon />}
                        onClick={handleMoreClick}
                        className='bottom-navigation-action'
                    />
                )}
            </BottomNavigation>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ zIndex: 1301 }}
            >
                {moreLinks.map((link, index) => (
                    <MenuItem
                        key={index}
                        component={Link}
                        to={link.to}
                        onClick={handleClose}
                    >
                        {link.icon}
                        {link.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default BottomBar;
