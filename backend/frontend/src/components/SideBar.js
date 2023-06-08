import React, { useEffect } from 'react'
import { Sidebar, Menu, MenuItem, sidebarClasses, menuClasses, SubMenu } from 'react-pro-sidebar';
import { ImStatsDots } from 'react-icons/im';
import { GoProject } from 'react-icons/go';
import { GiBrickPile, GiCampCookingPot, GiThrownCharcoal, GiWoodPile } from 'react-icons/gi';
import { TbReport } from 'react-icons/tb';
import { RiPlug2Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects } from '../actions/projectActions';
import { FaList } from 'react-icons/fa';
import { FcApproval } from 'react-icons/fc';


function SideBar() {
    const navigate = useNavigate()
  	const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
	const {userInfo} = userLogin

    const projectList = useSelector(state=> state.projectList)
	const {error:errorProjects, loading:loadingProjects, projects} = projectList

    useEffect(() => {
        if(!userInfo){
            navigate('/')
        }else{
			projects.length===0 && dispatch(listProjects())
		}
    }, [userInfo])
    
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
                component={<Link to={'/home'} />}
            >
                Dashboard
            </MenuItem>
            {/* <MenuItem 
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
                component={<Link to="/projects" />}
            >
                Projects
            </MenuItem> */}
            <SubMenu
                label="Projects"
                icon={<GoProject />} 
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
                {/* <MenuItem icon={<RiPlug2Line />}> Electric</MenuItem>
                <MenuItem icon={<GiWoodPile />}>Firewood</MenuItem>
                <MenuItem icon={<GiThrownCharcoal />}>Charcoal</MenuItem>
                <MenuItem icon={<GiBrickPile />}>Brickets</MenuItem> */}
                <MenuItem component={<Link to={`projects`} />} icon={<FaList />}>All Projects</MenuItem>
                {(!loadingProjects && !errorProjects) && projects.map(p=>
                    <MenuItem key={p._id} component={<Link to={`project/?id=${p._id}`} />} icon={<FcApproval />}>{p.name}</MenuItem>)}
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