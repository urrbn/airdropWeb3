import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sitemap as nav_items } from '../../data/sitemap'
import ArrowDownSVG from '../../svgs/arrow_down'
import TwitterSVG from '../../svgs/Socials/twitter'
import InstagramSVG from '../../svgs/Socials/instagram'
import { ThemeContext } from '../../context/ThemeContext/ThemeProvider'
import { SidebarContext } from '../../context/SidebarContext/GlobalProvider'
import TelegramSVG from '../../svgs/Socials/telegram'

const socials = [
  {
    id: 1,
    icon: <TelegramSVG className="fill-dark-text dark:fill-light-text" />,
  },
  {
    id: 2,
    icon: <TwitterSVG className="fill-dark-text dark:fill-light-text" />,
  },
  {
    id: 3,
    icon: <InstagramSVG className="fill-dark-text dark:fill-light-text" />,
  },
  // {
  //   id: 4,
  //   icon: <DribbleSVG className="fill-dark-text dark:fill-light-text" />,
  // },
]

export default function Sidebar({ fullSidebar, tempfixed, handleTempFixed, activeLink }) {
  const { setShowSidebar } = useContext(SidebarContext)
  const [activeItem, setActiveItem] = useState('null')
  const { theme } = useContext(ThemeContext)
  const location = useLocation()

  useEffect(() => {
    setActiveItem(activeLink)
  }, [activeLink])

  const handleActiveItem = (nav_item, nav_item_extendable) => {
    if (nav_item_extendable) {
      if (nav_item === activeItem) {
        setActiveItem('null')
      } else {
        setActiveItem(nav_item)
      }
    }
  }

  const handleSmallSidebar = (nav_item) => {
    if (nav_item === activeItem) {
      setActiveItem('null')
    } else {
      setActiveItem(nav_item)
    }
    setShowSidebar(true)
  }

  if (!fullSidebar) {
    return (
      <div className="w-full flex justify-end">
        <div className="w-[35%] flex flex-col items-center mb-[5%] justify-between">
          <div className="nav-items">
            <div className="logo-div flex mt-10 mb-20">
              <img src="/images/logo-small.svg" alt="logo" />
            </div>
            {nav_items.map((nav_item, index) =>
              nav_item.extendable ? (
                <div key={nav_item.id} className="mt-8" onClick={() => handleSmallSidebar(nav_item.name)}>
                  {nav_item.name === activeLink ? nav_item.activeIcon : nav_item.icon}
                </div>
              ) : (
                <Link key={nav_item.id} to={nav_item.link}>
                  <div className="mt-8">{nav_item.name === activeLink ? nav_item.activeIcon : nav_item.icon}</div>
                </Link>
              ),
            )}
          </div>

          <div className="flex justify-center">
            <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={tempfixed ? false : true}
                id="default-toggle"
                className="sr-only peer"
                onChange={handleTempFixed}
              />
              <div className="w-14 h-7 bg-[#F5F1EB] peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all border-[#F5F1EB] peer-checked:bg-dark-3" />
            </label>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full h-full pb-10  flex flex-col justify-between mb-5 overflow-scroll">
      <div className="logo-div flex justify-center mt-10">
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div className="nav-items">
        {activeItem === 'null' && <div className="bg-white dark:bg-dark-1 pt-[20%]"></div>}
        {nav_items.map((nav_item) => (
          <div key={nav_item.id} className="mt-8 w-full cursor-pointer">
            <Link to={nav_item.link}>
              <div
                className="flex justify-between items-center"
                onClick={(nav_item_name) => handleActiveItem(nav_item.name, nav_item.extendable)}
              >
                <div className="flex ml-[20%]">
                  {nav_item.name === activeLink ? nav_item.activeIcon : nav_item.icon}
                  <span
                    className={`font-gilroy font-semibold ml-5 ${
                      nav_item.name === activeLink
                        ? 'text-primary-green'
                        : 'text-dim-text dark:text-dim-text-dark hover:text-primary-green'
                    }`}
                  >
                    {nav_item.name}
                  </span>
                </div>
                {nav_item.extendable && (
                  <div className="mr-8">
                    <ArrowDownSVG className="fill-dark-text dark:fill-light-text" />
                  </div>
                )}
              </div>
            </Link>

              <div className={`bg-[#FAF8F5] dark:bg-dark-2 flex flex-col pl-[35%] mt-3  overflow-hidden ${activeItem === nav_item.name? "transition-sidebar-open pb-5":"transition-sidebar-close invisible"}`}>
                {nav_item.subitems.map((subItem, index) => (
                  <Link key={index} to={subItem.link} className="mt-5">
                    <span
                      className={`font-semibold font-gilroy ${
                        location.pathname === subItem.link
                          ? 'text-primary-green'
                          : 'text-dim-text dark:text-dim-text-dark hover:text-primary-green'
                      }`}
                    >
                      {subItem.name}
                    </span>
                  </Link>
                ))}
              </div>

          </div>
        ))}
        {activeItem === 'null' && <div className="bg-white dark:bg-dark-1 pt-[20%]"></div>}
      </div>
      <div className="md:hidden h-20"></div>

      <div className=" flex flex-col items-end mr-7">
        <div className="flex">
          {theme === 'dark' ? (
            <img className="mr-3" src="/images/sidebar/moon.svg" alt="moon" />
          ) : (
            <img className="mr-3" src="/images/sidebar/sun.svg" alt="sun" />
          )}
          <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={tempfixed ? false : true}
              id="default-toggle"
              className="sr-only peer"
              onChange={handleTempFixed}
            />
            <div className="w-10 h-6 md:w-14 md:h-7 bg-[#F5F1EB] peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:md:top-[2px] after:left-[0] after:md:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:md:h-6 after:w-5 after:md:w-6 after:transition-all border-[#F5F1EB] peer-checked:bg-dark-3" />
          </label>

          <div className="bg-[#C89211] rounded-[14px] flex items-center px-2 ml-5">
            <img src="/images/sidebar/logo.svg" alt="logo" />

            <span className="font-gilroy ml-[10px] text-sm font-bold text-white">$0.25</span>
          </div>
        </div>

        <div className="socials flex mt-9">
          {socials.map((social) => (
            <div
              key={social.id}
              className="twitter flex items-center justify-center bg-[#F5F1EB] dark:bg-dark-3 w-[34px] h-[34px] rounded-md ml-[14px] first:ml-0"
            >
              {social.icon}
            </div>
          ))}
        </div>

        <div className="copyrights">
          <span className=" text-[10px] text-dim-text dark:text-dim-text-dark font-gilroy font-medium">
            @2022 Arborswap. All right Reserved.
          </span>
        </div>
      </div>
    </div>
  )
}
