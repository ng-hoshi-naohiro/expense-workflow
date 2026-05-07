export default function ApplyCategory() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <h1 className="font-serif text-xl md:text-2xl font-medium text-ink mb-6">
        申請の種類を選んでください
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: "equipment", name: "施設備品購入", icon: "ri-archive-line", desc: "備品・消耗品・機械器具等の購入申請" },
          { id: "travel", name: "出張交通費精算", icon: "ri-train-line", desc: "出張に伴う交通費・宿泊費の精算申請" },
          { id: "recruitment", name: "採用関連費", icon: "ri-user-search-line", desc: "紹介手数料・求人広告費等の申請" },
        ].map((cat) => (
          <a
            key={cat.id}
            href={`/apply/${cat.id}`}
            className="bg-screen rounded-card shadow-card p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <i className={`${cat.icon} text-2xl text-primary`}></i>
            </div>
            <h3 className="font-medium text-ink mb-1">{cat.name}</h3>
            <p className="text-sm text-ink-soft">{cat.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}