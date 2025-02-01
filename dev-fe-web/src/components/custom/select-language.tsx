import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const LanguageSelect: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language || "en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLanguage(lang);
  };

  return (
    <Select onValueChange={handleChangeLanguage} value={language}>
      <SelectTrigger
        className="p-0 bg-transparent border-none focus:outline-none focus:ring-0 focus-visible:ring-0 text-[var(--foreground)]"
        aria-label="Select language"
      >
        <Languages className="w-5 h-5 cursor-pointer" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="vi">Tiếng Việt</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
};
