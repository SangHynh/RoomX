import { LanguageSelect } from '@/components/custom/select-language';
import { ThemeToggle } from '@/components/custom/theme-toggle';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <LanguageSelect />
      <ThemeToggle/>
      <div className="mt-4">
        <label>{t('hello')} {t('world')}</label>
      </div>
    </div>
  );
}

export default Dashboard;
