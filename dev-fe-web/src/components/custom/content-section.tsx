import React from "react";

interface ContentSectionProps {
  loading: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({ loading }) => {
  return <div>{loading ? "Đang tải..." : "Nội dung hiển thị ở đây"}</div>;
};

export default ContentSection;
