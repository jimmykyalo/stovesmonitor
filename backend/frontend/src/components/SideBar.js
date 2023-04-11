import React from 'react'
import { Sidebar, Menu, MenuItem, sidebarClasses, menuClasses, SubMenu } from 'react-pro-sidebar';
import { ImStatsDots } from 'react-icons/im';
import { GoProject } from 'react-icons/go';
import { GiBrickPile, GiCampCookingPot, GiThrownCharcoal, GiWoodPile } from 'react-icons/gi';
import { TbReport } from 'react-icons/tb';
import { RiPlug2Line } from 'react-icons/ri';

function SideBar() {
  return (
    <Sidebar rootStyles={{
        [`.${sidebarClasses.container}`]: {
            backgroundImage: "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);"
        },
      }}>
        <Menu>
            <MenuItem 
                icon={<ImStatsDots />} 
                rootStyles={{
                    ['.' + menuClasses.button]: {
                    backgroundColor: 'transparent',
                    color: '#ffffff !important',
                    '&:hover': {
                        backgroundColor: '#3bb78f !important',
                    },
                    },
                }}
            >
                Dashboard
            </MenuItem>
            <MenuItem 
                icon={<GoProject />} 
                rootStyles={{
                    ['.' + menuClasses.button]: {
                    backgroundColor: 'transparent',
                    color: '#ffffff !important',
                    '&:hover': {
                        backgroundColor: '#3bb78f !important',
                    },
                    },
                }}
            >
                Projects
            </MenuItem>
            <SubMenu
                label="Stoves"
                icon={<GiCampCookingPot />} 
                rootStyles={{
                    ['.' + menuClasses.button]: {
                    backgroundColor: 'transparent',
                    color: '#ffffff !important',
                    '&:hover': {
                        backgroundColor: '#3bb78f !important',
                    },
                    },
                    ['.' + menuClasses.subMenuContent]: {
                        backgroundColor: '#0bab64',
                    },
        
                }}
            >
                <MenuItem icon={<RiPlug2Line />}> Electric</MenuItem>
                <MenuItem icon={<GiWoodPile />}>Firewood</MenuItem>
                <MenuItem icon={<GiThrownCharcoal />}>Charcoal</MenuItem>
                <MenuItem icon={<GiBrickPile />}>Brickets</MenuItem>
            </SubMenu>
            
            <MenuItem 
                icon={<TbReport />} 
                rootStyles={{
                    ['.' + menuClasses.button]: {
                    backgroundColor: 'transparent',
                    color: '#ffffff !important',
                    '&:hover': {
                        backgroundColor: '#3bb78f !important',
                    },
                    },
                }}
            >
                Reports
            </MenuItem>
            
        </Menu>
    </Sidebar>
  )
}

export default SideBar