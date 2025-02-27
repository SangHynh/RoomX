import UserList from "@/components/admin/users/user-list";
import CMSLayout from "@/layouts/cms-layout";

const Dashboard: React.FC = () => {

  return (
    <CMSLayout>
        <UserList ></UserList>
    </CMSLayout>
  );
};

export default Dashboard;
