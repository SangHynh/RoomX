import React from "react";
import CMSLayout from "@/layouts/cms-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Users, Calendar } from "lucide-react";

const revenueData = [
  { name: "Jan", revenue: 3000 },
  { name: "Feb", revenue: 4500 },
  { name: "Mar", revenue: 6000 },
  { name: "Apr", revenue: 5000 },
  { name: "May", revenue: 7000 },
  { name: "Jun", revenue: 9000 },
];

const roomTypeRevenue = [
  { name: "Standard", revenue: 5000 },
  { name: "Deluxe", revenue: 8000 },
  { name: "Suite", revenue: 12000 },
];

const topCustomers = [
  { id: 1, name: "John Doe", totalSpent: "$1200" },
  { id: 2, name: "Jane Smith", totalSpent: "$950" },
  { id: 3, name: "Mike Johnson", totalSpent: "$870" },
];

const bookingStats = [
  { month: "Jan", bookings: 50, cancellations: 5 },
  { month: "Feb", bookings: 75, cancellations: 8 },
  { month: "Mar", bookings: 100, cancellations: 12 },
  { month: "Apr", bookings: 90, cancellations: 10 },
  { month: "May", bookings: 120, cancellations: 15 },
  { month: "Jun", bookings: 140, cancellations: 18 },
];

const Statistics: React.FC = () => {
  return (
    <CMSLayout>
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">$42,500</p>
              <p className="text-sm text-gray-500">+12% compared to last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-500" />
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">620</p>
              <p className="text-sm text-gray-500">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-500" />
                Returning Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">240</p>
              <p className="text-sm text-gray-500">45% of total customers</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Statistics Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Booking & Cancellations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="cancellations" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Room Type */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Revenue by Room Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Type</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roomTypeRevenue.map((room, index) => (
                  <TableRow key={index}>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>${room.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Total Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.totalSpent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
};

export default Statistics;
