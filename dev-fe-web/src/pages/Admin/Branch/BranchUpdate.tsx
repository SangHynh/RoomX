import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CMSLayout from "@/layouts/cms-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BranchService } from "@/services/admin/branch.service";
import { toast } from "sonner";

const BranchUpdate: React.FC = () => {
  const { branchId } = useParams(); // Lấy id từ URL
  const [branch, setBranch] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State để quản lý form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!branchId) return;
    const fetchBranch = async () => {
      try {
        const service = new BranchService();
        const data = await service.getDetailBranch(branchId);
        const branchData = data.content[0];
        setBranch(branchData);
        setName(branchData.name || "");
        setEmail(branchData.email || "");
        setPhoneNumber(branchData.phoneNumber || "");
        setAddress(branchData.address || "");
      } catch (err) {
        toast.error("Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchBranch();
  }, [branchId]);

  if (loading)
    return (
      <CMSLayout>
        <p className="text-center">Đang tải dữ liệu...</p>
      </CMSLayout>
    );

  return (
    <CMSLayout>
      <div className="flex justify-center items-center flex-1">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Cập Nhật Chi Nhánh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="id">ID</Label>
                <Input id="id" value={branch?.id} disabled />
              </div>

              <div>
                <Label htmlFor="branchCode">Mã Chi Nhánh</Label>
                <Input id="branchCode" value={branch?.branchCode} />
              </div>

              <div>
                <Label htmlFor="name">Tên Chi Nhánh</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Số Điện Thoại</Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address">Địa Chỉ</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <Button className="w-full">Cập Nhật</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
};

export default BranchUpdate;
