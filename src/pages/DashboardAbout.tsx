import React, { useEffect, useState } from "react";
import InventoryForm from "../components/InventoryForm";
import axios from "axios";
import { Card, CardBody, CardTitle, Container, Row } from "reactstrap";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useDarkMode } from "../context/DarkModeContext"; // Dark mode support

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DashboardAbout: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [stats, setStats] = useState<InventoryStats>({
    total: 0,
    author: 0,
    unread: 0,
    read: 0,
  });
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { darkMode } = useDarkMode(); // Get dark mode state

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get<{ data: InventoryItem[] }>(
          "https://bookhub-back.onrender.com/api/books"
        );
        const data = response.data.data || [];
        setInventory(data);
        setStats({
          total: data.length,
          author: data.filter((item) => item.author).length,
          unread: data.filter((item) => item.status === "Unread").length,
          read: data.filter((item) => item.status === "Read").length,
        });
      } catch (error) {
        setError("Error fetching inventory data. Please try again later.");
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  const chartData = {
    labels: ["Total Books", "Author", "Unread books", "Read books"],
    datasets: [
      {
        label: "Inventory Statistics",
        data: [stats.total, stats.author, stats.unread, stats.read],
        backgroundColor: ["#6b7280", "#facc15", "#ef4444", "#10b981"],
      },
    ],
  };

  const cardColors: Record<string, string> = {
    total: "bg-gray-700",
    author: "bg-yellow-500",
    unread: "bg-red-500",
    read: "bg-green-500",
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className={`header ${darkMode ? "bg-gray-900" : "bg-white"} text-white mx-auto px-4 py-8 rounded-lg shadow-lg`}>
        <Container fluid>
          <div className="header-body">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
              <div className="w-full h-[300px]">
                <Pie data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
              </div>
              <div className="w-full h-[300px]">
                <Bar data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
              </div>
            </div>

            <Row className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {Object.entries(stats).map(([key, value], index) => (
                <Card
                  key={index}
                  className={`shadow-md transition duration-300 hover:scale-105 border-0 rounded-lg text-white ${cardColors[key] || "bg-gray-700"}`}
                >
                  <CardBody className="p-4 flex items-center space-x-4">
                    <div>
                      <CardTitle tag="h6" className="text-sm uppercase tracking-wide font-semibold">
                        {key === "total"
                          ? "Total Books"
                          : key === "author"
                          ? "Author"
                          : key === "unread"
                          ? "Unread Books"
                          : "Read Books"}
                      </CardTitle>
                      <span className="text-2xl font-bold">{value}</span>
                      <p className="mt-1 text-xs flex items-center">
                        <span className="font-semibold">
                          {stats.total > 0 ? `+${((value / stats.total) * 100).toFixed(2)}%` : "0%"}
                        </span>
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Row>
          </div>
        </Container>
      </div>

      <InventoryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        item={editingItem}
        setInventory={setInventory}
      />
    </div>
  );
};

export default DashboardAbout;
