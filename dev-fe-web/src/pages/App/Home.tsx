import { CalendarCheck, Users, Settings, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Trang chủ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/user/schedule" className="p-4 bg-blue-500 text-white rounded-lg flex items-center space-x-3 shadow-md">
          <CalendarCheck size={24} />
          <span>Lịch cá nhân</span>
        </Link>
        <Link to="/user/booking" className="p-4 bg-green-500 text-white rounded-lg flex items-center space-x-3 shadow-md">
          <Bell size={24} />
          <span>Đặt lịch</span>
        </Link>
        <Link to="/user/profile" className="p-4 bg-yellow-500 text-white rounded-lg flex items-center space-x-3 shadow-md">
          <User size={24} />
          <span>Hồ sơ</span>
        </Link>
        <Link to="/user/groups" className="p-4 bg-purple-500 text-white rounded-lg flex items-center space-x-3 shadow-md">
          <Users size={24} />
          <span>Nhóm</span>
        </Link>
        <Link to="/user/suggestions" className="p-4 bg-red-500 text-white rounded-lg flex items-center space-x-3 shadow-md">
          <CalendarCheck size={24} />
          <span>Gợi ý đặt lịch</span>
        </Link>
        <Link to="/user/settings" className="p-4 bg-gray-500 text-white rounded-lg flex items-center space-x-3 shadow-md">
          <Settings size={24} />
          <span>Cài đặt</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;