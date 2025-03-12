import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, Calendar, CheckCircle, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CMSLayout from "@/layouts/cms-layout";

const stats = [
  { title: "Total Rooms", value: 15, icon: <Calendar className="w-6 h-6" /> },
  { title: "Bookings Today", value: 8, icon: <CheckCircle className="w-6 h-6" /> },
  { title: "Total Users", value: 200, icon: <Users className="w-6 h-6" /> },
  { title: "Total Revenue", value: "$12,500", icon: <DollarSign className="w-6 h-6" /> },
];

const bookings = [
  { id: 1, room: "Conference Room A", user: "John Doe", time: "10:00 AM - 11:00 AM", status: "Confirmed" },
  { id: 2, room: "Meeting Room B", user: "Jane Smith", time: "2:00 PM - 3:00 PM", status: "Pending" },
  { id: 3, room: "Boardroom C", user: "Mike Johnson", time: "4:00 PM - 5:00 PM", status: "Cancelled" },
];

const bookingChartData = [
  { name: "Jan", bookings: 30 },
  { name: "Feb", bookings: 45 },
  { name: "Mar", bookings: 60 },
  { name: "Apr", bookings: 50 },
  { name: "May", bookings: 70 },
  { name: "Jun", bookings: 90 },
];

const revenueChartData = [
  { name: "Jan", revenue: 3000 },
  { name: "Feb", revenue: 4500 },
  { name: "Mar", revenue: 6000 },
  { name: "Apr", revenue: 5000 },
  { name: "May", revenue: 7000 },
  { name: "Jun", revenue: 9000 },
];

const Dashboard: React.FC = () => {
  return (
    <CMSLayout>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">{stat.icon}{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map(booking => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.room}</TableCell>
                    <TableCell>{booking.user}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Booking Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Revenue Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        
      </div>
    </CMSLayout>
  );
};

export default Dashboard;