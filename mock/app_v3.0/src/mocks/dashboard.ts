export const monthlyStats = {
  totalRequests: 24,
  approvedCount: 18,
  rejectedCount: 2,
  pendingCount: 4,
  totalAmount: 2456700,
  averageAmount: 102363,
};

export const monthlyTrends = [
  { month: "1月", approved: 3, rejected: 0, pending: 1, amount: 450000 },
  { month: "2月", approved: 4, rejected: 1, pending: 0, amount: 680000 },
  { month: "3月", approved: 2, rejected: 0, pending: 1, amount: 320000 },
  { month: "4月", approved: 5, rejected: 1, pending: 0, amount: 560000 },
  { month: "5月", approved: 4, rejected: 0, pending: 2, amount: 446700 },
];

export const budgetOverview = {
  department: "東京都 本社",
  fiscalYear: "2026年度",
  totalBudget: 5000000,
  usedAmount: 2456700,
  remainingAmount: 2543300,
  categories: [
    { name: "施設備品購入", budget: 2000000, used: 1350000, color: "#24BD7E" },
    { name: "出張交通費精算", budget: 1800000, used: 769500, color: "#1a4480" },
    { name: "採用関連費", budget: 1200000, used: 337200, color: "#c8472b" },
  ],
};

export const topSpenders = [
  { name: "田中 太郎", amount: 1250000, count: 8 },
  { name: "佐藤 花子", amount: 980000, count: 6 },
  { name: "鈴木 一郎", amount: 226700, count: 5 },
  { name: "高橋 健太", amount: 0, count: 5 },
];

export const approvalStats = {
  averageDays: 2.3,
  fastestApproval: { name: "プリンター消耗品", days: 0.5 },
  slowestApproval: { name: "エアコン設置費用", days: 5 },
  byApprover: [
    { name: "佐藤 花子", approved: 12, rejected: 1, avgDays: 1.2 },
    { name: "山田 部長", approved: 8, rejected: 1, avgDays: 3.5 },
  ],
};