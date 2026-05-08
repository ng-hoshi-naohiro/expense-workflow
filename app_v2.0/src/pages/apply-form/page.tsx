import { useParams } from "react-router-dom";
import EquipmentForm from "./components/EquipmentForm";
import TravelForm from "./components/TravelForm";
import RecruitmentForm from "./components/RecruitmentForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ApplyForm() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  switch (category) {
    case "equipment":
      return <EquipmentForm />;
    case "travel":
      return <TravelForm />;
    case "recruitment":
      return <RecruitmentForm />;
    default:
      return (
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer mb-4 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            戻る
          </button>
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-ink mb-6">
            申請フォーム
          </h1>
          <div className="bg-white rounded-card shadow-card p-6 border border-line/50">
            <p className="text-base text-ink-soft">無効なカテゴリです。カテゴリを選択し直してください。</p>
          </div>
        </div>
      );
  }
}