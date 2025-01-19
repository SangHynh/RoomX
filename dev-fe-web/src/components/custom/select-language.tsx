import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSelect: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <Select onValueChange={i18n.changeLanguage}>
      <SelectTrigger 
        className="p-0 bg-transparent border-none focus:outline-none" 
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
