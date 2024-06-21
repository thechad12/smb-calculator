import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    AddIcon,
    ExternalLinkIcon,
    RepeatIcon,
    EditIcon,
} from '@chakra-ui/icons';

const MainDropdownMenu = props => {

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                color='gray.300'
            />
            <MenuList>
                <MenuItem icon={<EditIcon />} command='⌘O'>
                    Main Feed
                </MenuItem>
                <MenuItem icon={<AddIcon />} command='⌘T'>
                    Business Diligence
                </MenuItem>
                <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                    Business Comparisons
                </MenuItem>
                <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                    Portfolio Analytics
                </MenuItem>
                <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                    Add a Business
                </MenuItem>
                <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                    Import
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default MainDropdownMenu;