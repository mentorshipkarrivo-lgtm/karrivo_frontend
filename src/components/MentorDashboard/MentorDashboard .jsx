import React, { useState, useEffect } from 'react';
import { Home, Calendar, Bell, User, BookOpen, Users, FileText, Briefcase, MessageSquare, UserPlus, DollarSign, Gift, Star, HelpCircle, Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import SessionsPage from './sessions/session';

// Section Components (These would normally be in separate files)
const DashboardSection = () => (
  <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
        <h3 className="text-gray-400 text-sm mb-2">Total Revenue</h3>
        <p className="text-white text-3xl font-bold">$23,902</p>
        <p className="text-green-400 text-sm mt-2">↑ 4.2% from last month</p>
      </div>
      <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
        <h3 className="text-gray-400 text-sm mb-2">Active Mentees</h3>
        <p className="text-white text-3xl font-bold">16,815</p>
        <p className="text-green-400 text-sm mt-2">↑ 1.7% from last month</p>
      </div>
      <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
        <h3 className="text-gray-400 text-sm mb-2">New Requests</h3>
        <p className="text-white text-3xl font-bold">1,457</p>
        <p className="text-red-400 text-sm mt-2">↓ 2.9% from last month</p>
      </div>
      <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
        <h3 className="text-gray-400 text-sm mb-2">Total Mentees</h3>
        <p className="text-white text-3xl font-bold">2,023</p>
        <p className="text-green-400 text-sm mt-2">↑ 0.9% from last month</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Revenue Overview</h3>
        <div className="h-64 flex items-end justify-between gap-4">
          {[5200, 4800, 7500, 4200, 8100, 3600].map((value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-[#0098cc] rounded-t-lg transition-all hover:bg-[#0098cc]/80"
                style={{ height: `${(value / 8100) * 100}%` }}
              />
              <span className="text-gray-400 text-xs mt-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">September 2024</h3>
        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-gray-400 text-xs">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(30)].map((_, i) => (
            <button
              key={i}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-sm
                ${i === 18 ? 'bg-[#0098cc] text-white' : 'text-gray-300 hover:bg-[#0098cc]/20'}
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <h4 className="text-white text-sm font-semibold mb-2">Community Growth</h4>
          <div className="flex items-center gap-2">
            <span className="text-green-400 text-sm">↑ 0.6% from last month</span>
            <span className="text-white text-2xl font-bold ml-auto">65%</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Recent Session Bookings</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0098cc]/20">
              <th className="text-left text-gray-400 text-sm py-3">Session Name</th>
              <th className="text-left text-gray-400 text-sm py-3">Mentee Name</th>
              <th className="text-left text-gray-400 text-sm py-3">Mentee ID</th>
              <th className="text-left text-gray-400 text-sm py-3">Amount</th>
              <th className="text-left text-gray-400 text-sm py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#0098cc]/10">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0098cc]/20 rounded-lg"></div>
                  <span className="text-white">Career Mentorship</span>
                </div>
              </td>
              <td className="text-gray-300">Aria</td>
              <td className="text-gray-300">#3456791</td>
              <td className="text-white">$372.00</td>
              <td>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const BookingsSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <Calendar className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">Session Bookings</h2>
      <p className="text-gray-400">Manage your session bookings here</p>
    </div>
  </div>
);

const SessionsSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <BookOpen className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">My Sessions</h2>
      <p className="text-gray-400">View and manage your sessions</p>
    </div>
  </div>
);

const MenteesSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <Users className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">My Mentees</h2>
      <p className="text-gray-400">Connect with your mentees</p>
    </div>
  </div>
);

const ProgramsSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <FileText className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">Training Programs</h2>
      <p className="text-gray-400">Explore training programs</p>
    </div>
  </div>
);

const AssignmentsSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <Briefcase className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">Assignments</h2>
      <p className="text-gray-400">Manage assignments</p>
    </div>
  </div>
);

const MessagesSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <MessageSquare className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">Messages</h2>
      <p className="text-gray-400">View your messages</p>
    </div>
  </div>
);

const ConnectSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <UserPlus className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">Connect Mentees</h2>
      <p className="text-gray-400">Connect with new mentees</p>
    </div>
  </div>
);

const EarningsSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <DollarSign className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">My Earnings</h2>
      <p className="text-gray-400">Track your earnings</p>
    </div>
  </div>
);

const RewardsSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <Gift className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">Rewards</h2>
      <p className="text-gray-400">View your rewards</p>
    </div>
  </div>
);

const ReviewsSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <Star className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">Reviews</h2>
      <p className="text-gray-400">Read your reviews</p>
    </div>
  </div>
);

const SupportSection = () => (
  <div className="p-6">
    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-12 text-center">
      <HelpCircle className="w-16 h-16 text-[#0098cc] mx-auto mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">Support Request</h2>
      <p className="text-gray-400">Get help and support</p>
    </div>
  </div>
);

// Logout Modal Component
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
          <LogOut className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-white text-2xl font-bold text-center mb-2">Confirm Logout</h2>
        <p className="text-gray-400 text-center mb-6">
          Are you sure you want to logout? You'll need to sign in again to access your account.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-[#0098cc]/10 text-white py-3 rounded-lg hover:bg-[#0098cc]/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple Router Component
const Router = ({ currentRoute }) => {
  const routes = {
    'dashboard': DashboardSection,
    'bookings': BookingsSection,
    "Mentor-sessions": SessionsPage,
    'mentees': MenteesSection,
    'programs': ProgramsSection,
    'assignments': AssignmentsSection,
    'messages': MessagesSection,
    'connect': ConnectSection,
    'earnings': EarningsSection,
    'rewards': RewardsSection,
    'reviews': ReviewsSection,
    'support': SupportSection,
  };

  const Component = routes[currentRoute] || DashboardSection;
  return <Component />;
};

// Navigation items configuration
const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/dashboard' },
  { id: 'bookings', label: 'Session Bookings', icon: Calendar, route: '/bookings' },
  { id: 'Mentor-sessions', label: 'My Sessions', icon: BookOpen, route: '/Mentor-sessions' },
  { id: 'mentees', label: 'My Mentees', icon: Users, route: '/mentees' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, route: '/messages' },
  { id: 'earnings', label: 'My Earnings', icon: DollarSign, route: '/earnings' },
  { id: 'reviews', label: 'Reviews', icon: Star, route: '/reviews' },
  { id: 'support', label: 'Support Request', icon: HelpCircle, route: '/support' },
  { id: 'logout', label: 'Logout', icon: LogOut }
];


// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// };



const ProfileDropdown = ({ onLogoutClick, isOpen, onClose }) => {
  const navigate = useNavigate();

  const [userinfo, setuserinfo] = useState(null)


  useEffect(() => {
    const userData = localStorage.getItem("userData");
    console.log(userData, "userData (raw)");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setuserinfo(parsedUser);
      console.log(parsedUser.name, "name");
    }
  }, []);


  // console.log(userinfo.name, "userinfo")


  if (!isOpen) return null;




  const handleProfileClick = () => {
    navigate("/mentor-profile");
    onClose?.();

  };




  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#062117] rounded-full flex items-center justify-center text-white font-bold">
            {userinfo?.name?.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[#062117]">{userinfo?.name}</p>
            <p className="text-sm text-gray-500">{userinfo?.email}</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <button
          onClick={handleProfileClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <User size={18} />
          <span>View Profile</span>
        </button>
        <button
          onClick={onLogoutClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};


const MentorDashboard = () => {
  const [currentRoute, setCurrentRoute] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // const [mentorFulldata, setMentorFulldata] = useState(null)

  // const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
  // setMentorFulldata(data)

  // const [email, setemail] = useState("")

  // useEffect(() => {
  //   const userData = localStorage.getItem("userData");
  //   console.log(userData, "userData (raw)");

  //   if (userData) {
  //     try {
  //       const parsedData = JSON.parse(userData);
  //       setUserData(parsedData);
  //       console.log(parsedData, "parsedData");
  //       setemail(parsedData.email)
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //     }
  //   }
  // }, []);



  // useEffect(() => {
  //   if (email) {
  //     getMentorDetails(email);
  //   }
  // }, [email])




  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e) => {
      const path = window.location.hash.slice(1) || 'dashboard';
      setCurrentRoute(path);
    };

    window.addEventListener('popstate', handlePopState);

    // Set initial route from URL
    const initialPath = window.location.hash.slice(1) || 'dashboard';
    setCurrentRoute(initialPath);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route) => {
    setCurrentRoute(route);
    window.history.pushState(null, '', `#${route}`);
  }

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Navigate to login or home page
    window.location.href = '/';
  };

  const Header = () => (
    <header className="bg-[#062117] border-b border-[#0098cc]/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden text-white hover:text-[#0098cc] transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0098cc] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-white text-xl font-bold">MentorHub</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-[#062117] placeholder-gray-400 focus:outline-none focus:border-[#062117]"
        />
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="w-10 h-10 bg-[#062117] rounded-full flex items-center justify-center text-white font-semibold hover:bg-[#062117]/90 transition-colors"
          >
            {userData?.name?.charAt(0) || 'U'}
          </button>
          <ProfileDropdown
            userData={userData}
            isOpen={isProfileDropdownOpen}
            onClose={() => setIsProfileDropdownOpen(false)}
            onProfileClick={() => {
              navigate('profile');
              setIsProfileDropdownOpen(false);
            }}
            onLogoutClick={() => {
              setIsProfileDropdownOpen(false);
              setIsLogoutModalOpen(true);
            }}
          />
        </div>
      </div>
    </header>
  );

  const Sidebar = () => (
    <aside className={`
      fixed lg:sticky top-0 left-0 h-screen bg-[#062117] border-r border-[#0098cc]/20 
      transition-transform duration-300 z-50
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      w-64 overflow-y-auto
    `}>
      <div className="p-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'logout') {
                    setIsLogoutModalOpen(true);
                  } else {
                    navigate(item.id);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive
                    ? 'bg-[#0098cc] text-white'
                    : 'text-gray-300 hover:bg-[#0098cc]/10 hover:text-white'}
                  ${item.id === 'logout' ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : ''}
                `}
              >
                <Icon size={20} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

 
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#0a1612] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Router currentRoute={currentRoute} />
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default MentorDashboard;