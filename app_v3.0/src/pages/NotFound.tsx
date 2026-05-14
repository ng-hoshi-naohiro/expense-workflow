import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6">
        <span className="text-8xl md:text-9xl font-mono font-bold text-line select-none">
          404
        </span>
      </div>
      <h1 className="text-xl md:text-2xl font-serif font-medium text-ink">
        ページが見つかりません
      </h1>
      <p className="mt-2 text-sm text-ink-soft font-mono">{location.pathname}</p>
      <p className="mt-4 text-base text-ink-soft">
        お探しのページは存在しないか、移動された可能性があります
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-primary text-white font-bold text-sm hover:bg-primary-dark active:scale-[0.98] transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        ホームに戻る
      </Link>
    </div>
  );
}