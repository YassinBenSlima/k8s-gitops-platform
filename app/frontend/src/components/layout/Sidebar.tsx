import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../node_modules/react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  UsersIcon,
  CalendarIcon,
  ActivityIcon,
  MessageSquareIcon,
  BrainIcon,
  SettingsIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
  AwardIcon,
  Package2Icon,
  UserIcon,
  LogOutIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  UserCogIcon,
  BellIcon,
  TruckIcon,
  LayoutDashboardIcon,
  ScanIcon,
  ClipboardListIcon,
  CreditCardIcon,
  HeartIcon,
  ZapIcon,
  StethoscopeIcon,
  FolderIcon,
  ShieldIcon,
  WrenchIcon
} from
  'lucide-react';
import { AppLogo } from '../common/AppLogo';
interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}
interface NavGroup {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navGroups: NavGroup[] = [
    {
      label: 'Général',
      icon: HomeIcon,
      items: [
        {
          name: 'Tableau de Bord',
          href: '/dashboard',
          icon: HomeIcon
        },
        {
          name: 'Console Cardiologue',
          href: '/console',
          icon: LayoutDashboardIcon,
          badge: 'Live'
        }]

    },
    {
      label: 'Patients & Clinique',
      icon: UsersIcon,
      items: [
        {
          name: 'Patients Cardiaques',
          href: '/patients',
          icon: UsersIcon
        },
        {
          name: 'Consultations & RDV',
          href: '/appointments',
          icon: CalendarIcon
        },
        {
          name: 'Examens Cliniques',
          href: '/examen-clinique',
          icon: StethoscopeIcon
        }]

    },
    {
      label: 'Cardiologie',
      icon: HeartIcon,
      items: [
        {
          name: 'ECG & Diagnostics',
          href: '/diagnostics',
          icon: ActivityIcon
        },
        {
          name: 'Rapports ECG',
          href: '/ecg-reports',
          icon: HeartIcon,
          badge: 'Nouveau'
        },
        {
          name: 'Imagerie Cardiaque',
          href: '/heart-imaging',
          icon: ScanIcon,
          badge: 'Nouveau'
        },
        {
          name: 'Score de Risque IA',
          href: '/risk-scoring',
          icon: BrainIcon,
          badge: 'IA'
        },
        {
          name: 'Protocoles de Soins',
          href: '/care-pathways',
          icon: ClipboardListIcon
        }]

    },
    {
      label: 'Gestion',
      icon: WrenchIcon,
      items: [
        {
          name: 'Communication',
          href: '/communication',
          icon: MessageSquareIcon
        },
        {
          name: 'Notifications',
          href: '/notifications',
          icon: BellIcon
        },
        {
          name: 'Matériel Médical',
          href: '/stock',
          icon: Package2Icon
        },
        {
          name: 'Fournisseurs',
          href: '/fournisseurs',
          icon: TruckIcon
        }]

    },
    {
      label: 'Administration',
      icon: ShieldIcon,
      items: [
        {
          name: 'Facturation Cardio',
          href: '/cardiology-billing',
          icon: CreditCardIcon,
          badge: 'Nouveau'
        },
        {
          name: 'Ressources Humaines',
          href: '/hr',
          icon: UserCogIcon
        },
        {
          name: 'Utilisateurs',
          href: '/users',
          icon: SettingsIcon
        }]

    }];

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div
        className={`lg:hidden fixed top-0 ${isRTL ? 'right-0' : 'left-0'} z-20 m-4`}>

        <motion.button
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-md text-gray-600 dark:text-gray-300">

          {collapsed ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </motion.button>
      </div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {collapsed &&
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.2
            }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setCollapsed(false)} />

        }
      </AnimatePresence>

      {/* Mobile sidebar */}
      <motion.aside
        className={`lg:hidden fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-20 w-52 flex flex-col bg-white dark:bg-gray-800 border-${isRTL ? 'l' : 'r'} border-gray-200 dark:border-gray-700 shadow-sm`}
        initial={{
          x: isRTL ? 280 : -280
        }}
        animate={{
          x: collapsed ? 0 : isRTL ? 280 : -280
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        dir={isRTL ? 'rtl' : 'ltr'}>

        <SidebarContent
          navGroups={navGroups}
          location={location}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          setCollapsed={setCollapsed}
          isRTL={isRTL} />

      </motion.aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex lg:flex-col w-52 bg-white dark:bg-gray-800 border-${isRTL ? 'l' : 'r'} border-gray-200 dark:border-gray-700 shadow-sm`}
        dir={isRTL ? 'rtl' : 'ltr'}>

        <SidebarContent
          navGroups={navGroups}
          location={location}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          setCollapsed={setCollapsed}
          isRTL={isRTL} />

      </aside>
    </>);

};
const SidebarContent = ({
  navGroups,
  location,
  hoveredItem,
  setHoveredItem,
  setCollapsed,
  isRTL







}: { navGroups: NavGroup[]; location: any; hoveredItem: string | null; setHoveredItem: (v: string | null) => void; setCollapsed: (v: boolean) => void; isRTL: boolean; }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  // Determine which groups contain the active route
  const getActiveGroup = () => {
    const active = new Set<string>();
    navGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (
          location.pathname === item.href ||
          location.pathname.startsWith(`${item.href}/`)) {
          active.add(group.label);
        }
      });
    });
    return active;
  };
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    // All groups open by default
    return new Set(navGroups.map((g) => g.label));
  });
  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);
  const profileMenuItems = [
    {
      name: 'Profil',
      icon: UserIcon,
      href: '/profile',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/30'
    },
    {
      name: 'Paramètres',
      icon: SettingsIcon,
      href: '/settings',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30'
    },
    {
      name: 'Déconnexion',
      icon: LogOutIcon,
      href: '/logout',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-900/30'
    }];

  return (
    <>
      <div className="flex items-center justify-center h-12 px-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center">
          <AppLogo size="sm" variant="full" animate={false} />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <nav className="px-1.5 space-y-0.5">
          {navGroups.map((group) => {
            const isOpen = openGroups.has(group.label);
            const GroupIcon = group.icon;
            const hasActive = group.items.some(
              (item) =>
                location.pathname === item.href ||
                location.pathname.startsWith(`${item.href}/`)
            );
            return (
              <div key={group.label} className="mb-1">
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={`w-full flex items-center px-2 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-colors ${hasActive ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}>

                  <GroupIcon
                    className={`h-3 w-3 flex-shrink-0 ${isRTL ? 'ml-1.5' : 'mr-1.5'}`} />

                  <span className="flex-1 text-left truncate">
                    {group.label}
                  </span>
                  <motion.div
                    animate={{
                      rotate: isOpen ? 0 : -90
                    }}
                    transition={{
                      duration: 0.2
                    }}>

                    <ChevronDownIcon className="h-3 w-3 flex-shrink-0" />
                  </motion.div>
                </button>

                {/* Group items */}
                <AnimatePresence initial={false}>
                  {isOpen &&
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1
                      }}
                      exit={{
                        height: 0,
                        opacity: 0
                      }}
                      transition={{
                        duration: 0.2,
                        ease: 'easeInOut'
                      }}
                      className="overflow-hidden">

                      <div
                        className={`space-y-0.5 pb-1 ${isRTL ? 'pr-2 border-r border-gray-100 dark:border-gray-700' : 'pl-2 border-l border-gray-100 dark:border-gray-700'} mx-2`}>

                        {group.items.map((item) => {
                          const isActive =
                            location.pathname === item.href ||
                            location.pathname.startsWith(`${item.href}/`);
                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={`${isActive ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'} group flex items-center px-2 py-1.5 text-xs font-medium rounded-md relative`}
                              onClick={() => setCollapsed(false)}
                              onMouseEnter={() => setHoveredItem(item.name)}
                              onMouseLeave={() => setHoveredItem(null)}>

                              <div
                                className={`${isActive ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'} ${isRTL ? 'ml-2' : 'mr-2'} h-3.5 w-3.5 flex-shrink-0`}>

                                <item.icon className="h-3.5 w-3.5" />
                              </div>
                              <span className="truncate">{item.name}</span>
                              {item.badge &&
                                <span
                                  className={`${isRTL ? 'mr-auto' : 'ml-auto'} inline-flex items-center px-1 py-0.5 rounded text-[9px] font-medium flex-shrink-0 ${item.badge === 'IA' ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300' : item.badge === 'Live' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'}`}>

                                  {item.badge}
                                </span>
                              }
                              {isActive &&
                                <span
                                  className={`absolute ${isRTL ? 'right-0' : 'left-0'} w-0.5 h-5 bg-red-500 dark:bg-red-400 rounded-${isRTL ? 'l' : 'r'}-md`} />

                              }
                            </Link>);

                        })}
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              </div>);

          })}
        </nav>
      </div>

      <div className="relative" ref={profileMenuRef}>
        <motion.button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-full px-3 py-2.5 border-t border-gray-200 dark:border-gray-700 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">

          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center text-white font-medium flex-shrink-0">
            <AwardIcon className="h-3 w-3" />
          </div>
          <div className={`${isRTL ? 'mr-2' : 'ml-2'} flex-1 min-w-0`}>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">
              Dr. Martin
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Cardiologue
            </p>
          </div>
          <motion.div
            animate={{
              rotate: showProfileMenu ? 180 : 0
            }}
            transition={{
              duration: 0.2
            }}>

            <ChevronUpIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showProfileMenu &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                y: 10,
                scale: 0.95
              }}
              transition={{
                duration: 0.2
              }}
              className={`absolute bottom-full ${isRTL ? 'right-2' : 'left-2'} mb-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50`}>

              <div className="py-1">
                {profileMenuItems.map((item, index) =>
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setShowProfileMenu(false)}>

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isRTL ? 20 : -20
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: index * 0.05
                      }}
                      className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">

                      <div
                        className={`h-7 w-7 rounded-lg ${item.bgColor} flex items-center justify-center ${isRTL ? 'ml-2' : 'mr-2'}`}>

                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                        {item.name}
                      </span>
                    </motion.div>
                  </Link>
                )}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </>);

};
export default Sidebar;