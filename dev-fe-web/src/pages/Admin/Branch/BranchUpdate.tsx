import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CMSLayout from "@/layouts/cms-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BranchService } from "@/services/admin/branch.service";
import { toast } from "sonner";
import CopyableInput from "@/components/admin/custom/copyable-input";

const BranchUpdate: React.FC = () => {
  const { branchId } = useParams(); // Lấy id từ URL
  const [branch, setBranch] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State để quản lý form
  const [id, setId] = useState("");
  const [branchCode, setBranchCode] = useState("");
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
        setId(branchData.id);
        setBranch(branchData);
        setBranchCode(branchData.branchCode || "");
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

  const handleUpdate = async () => {
    if (!branchId) return;

    const updatedData = { name, email, phoneNumber, address };

    try {
      const service = new BranchService();
      await service.updateBranch(id, updatedData);
      toast.success("Cập nhật chi nhánh thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật.");
    }
  };

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
                <CopyableInput id="id" label="ID" value={branch?.id || ""} />
              </div>

              <div>
                <Label htmlFor="branchCode">Mã Chi Nhánh</Label>
                <Input
                  id="branchCode"
                  value={branchCode}
                  onChange={(e) => setBranchCode(e.target.value)}
                />
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

              <Button className="w-full" onClick={handleUpdate}>
                Cập Nhật
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
};

export default BranchUpdate;
