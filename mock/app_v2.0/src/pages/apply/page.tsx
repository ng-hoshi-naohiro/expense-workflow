import { useNavigate } from "react-router-dom";
import { Package, TrainFront, Users, ArrowLeft } from "lucide-react";

export default function ApplyCategory() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "equipment",
      name: "施設備品購入",
      icon: Package,
      color: "#24BD7E",
      desc: "備品・消耗品・機械器具等の購入申請",
      examples: "オフィス家具、医療器具、トナーカートリッジ",
    },
    {
      id: "travel",
      name: "出張交通費精算",
      icon: TrainFront,
      color: "#b85c00",
      desc: "出張に伴う交通費・宿泊費の精算申請",
      examples: "新幹線、飛行機、宿泊費、タクシー代",
    },
    {
      id: "recruitment",
      name: "採用関連費",
      icon: Users,
      color: "#c8472b",
      desc: "紹介手数料・求人広告費等の申請",
      examples: "人材紹介手数料、求人サイト広告費",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <div className="relative">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer mb-4 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          戻る
        </button>

        <h1 className="text-2xl md:text-3xl font-serif font-medium text-ink mb-2">
          申請の種類を選んでください
        </h1>
        <p className="text-base text-ink-soft mb-8 font-medium">
          申請内容に応じたカテゴリを選択してください
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/apply/${cat.id}`)}
                className="bg-paper rounded-card p-6 hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer text-left group border border-line/30"
              >
                <div
                  className="w-14 h-14 rounded-card flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: cat.color }}
                  />
                </div>
                <h3 className="text-xl font-serif font-medium text-ink mb-2 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-base text-ink-soft mb-3 font-medium">{cat.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.examples.split("、").map((ex) => (
                    <span
                      key={ex}
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-screen-soft text-ink-soft"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent templates */}
        <div className="mt-10">
          <h2 className="text-base font-serif font-medium text-ink mb-4">
            最近の申請からコピー
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/apply/equipment")}
              className="flex items-center gap-3 px-4 py-3 rounded-card bg-white border border-line/50 hover:bg-screen-soft hover:shadow-card transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[rgba(36,189,126,0.08)] flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-ink">オフィス備品購入</p>
                <p className="text-xs text-ink-soft">2026-05-05</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/apply/travel")}
              className="flex items-center gap-3 px-4 py-3 rounded-card bg-white border border-line/50 hover:bg-screen-soft hover:shadow-card transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[rgba(184,92,0,0.08)] flex items-center justify-center">
                <TrainFront className="w-5 h-5 text-warning" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-ink">大阪出張 交通費</p>
                <p className="text-xs text-ink-soft">2026-04-20</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}