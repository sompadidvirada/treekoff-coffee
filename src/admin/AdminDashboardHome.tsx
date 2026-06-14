import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Users,
  Newspaper,
  UserPlus,
  LayoutDashboard,
  BarChart3,
  Table,
} from "lucide-react";
import {
  GetAllTotalAnalytics,
  GetTotalReadAritcles,
  GetTotalViewHonePage,
} from "api/dashboard";

const chartConfig = {
  views: {
    label: "Page Views",
  },
} satisfies ChartConfig;

const chartConfig2 = {
  views: {
    label: "Article Read",
  },
} satisfies ChartConfig;

const AdminDashboardHome = () => {
  const [data, setData] = useState({
    read_percent_change: 0,
    total_article: 0,
    total_homepage: 0,
    view_percent_change: 0,
    total_job:0
  });
  const [chartView, setChartView] = useState([]);
  const [chartRead, setChartRead] = useState([]);

  useEffect(() => {
    const fecthDataAnalytics = async () => {
      try {
        const ress = await GetAllTotalAnalytics();
        setData(ress.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fecthTotalViewHomePage = async () => {
      try {
        const ress = await GetTotalViewHonePage();
        setChartView(ress.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fecthTotalReadAritcles = async () => {
      try {
        const ress = await GetTotalReadAritcles();
        setChartRead(ress.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthDataAnalytics();
    fecthTotalViewHomePage();
    fecthTotalReadAritcles();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-4 font-lao">
      <div className="flex items-center gap-2">
        <Table className="h-6 w-6 text-muted-foreground" />
        <h2 className="text-xl font-bold tracking-tight">
          ຈັດການຂໍ້ມູນພະນັກງານ
        </h2>
      </div>
      {/* --- SECTION 1: KEY PERFORMANCE INDICATORS --- */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold tracking-tight">
            ໂຕເລກຊີ້ວັດປະສິດທິພາບທັງໝົດ
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-none shadow-sm bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-lao font-medium uppercase tracking-wider opacity-70">
                ຄົນເຂົ້າເບີ່ງເວັປໃຊ້ທັງໝົດ 30 ມຶ້ຍ້ອນຫລັງ
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.total_homepage ? data.total_homepage : "-"}
              </div>
              <p className="text-xs text-emerald-500 font-medium">
                {data?.view_percent_change ? data.view_percent_change : "-"}%{" "}
                <span className="text-muted-foreground font-normal">
                  ທຽບກັບເດືອນທີແລ້ວ
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-lao font-medium uppercase tracking-wider opacity-70">
                ຄົນອ່ານບົດຄວມທັງໝົດ 30 ມື້ຍ້ອນຫຼັງ
              </CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.total_article ? data.total_article : "-"}
              </div>
              <p className="text-xs text-emerald-500 font-medium">
                {data?.read_percent_change ? data.read_percent_change : "-"}%{" "}
                <span className="text-muted-foreground font-normal">
                  ທຽບກັບເດືອນທີແລ້ວ
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-lao font-medium uppercase tracking-wider opacity-70">
                ຄົນສົນໃຈສະໝັກວຽກ 30 ມື້ຍ້ອນຫລັງ
              </CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.total_job}</div>
              <p className="text-xs text-muted-foreground">
                ຕິດຕໍ່ຕຳແໜ່ງທີ່ສົນໃຈ
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 2: VISITOR ANALYTICS --- */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold tracking-tight">
            ກຮາຟຄົນເຂົ້າເບີ່ງເວັປໃຊ້ 30 ວັນຍ້ອນຫລັງ
          </h2>
        </div>

        <div className="grid gap-6">
          {/* Website Traffic Chart */}
          <Card className="py-0">
            <CardContent className="px-2 sm:p-6">
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  data={chartView}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <YAxis
                    hide={true}
                    domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="w-[150px]"
                        nameKey="views"
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        }}
                      />
                    }
                  />
                  <Bar dataKey={"views"} fill={`var(--color-blue-400)`} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-2 my-4">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold tracking-tight">
            ກຮາຟຄົນເຂົ້າອ່ານບົດຄວາມ 30 ວັນຍ້ອນຫລັງ
          </h2>
        </div>

        <div className="grid gap-6">
          {/* News Views Chart */}
          <Card className="py-0">
            <CardContent className="px-2 sm:p-6">
              <ChartContainer
                config={chartConfig2}
                className="aspect-auto h-[250px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  data={chartRead}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <YAxis
                    hide={true}
                    domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="w-[150px]"
                        nameKey="views"
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        }}
                      />
                    }
                  />
                  <Bar dataKey={"views"} fill={`var(--color-green-400)`} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardHome;
