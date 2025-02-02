import CMSLayout from "@/layouts/cms-layout";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <CMSLayout>
      <h1>{t("Dashboard")}</h1>
      <p>Welcome to the admin panel!</p>
    </CMSLayout>
  );
};

export default Dashboard;
