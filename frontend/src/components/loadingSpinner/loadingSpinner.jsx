// components/LoadingSpinner.jsx
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = 24 }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}
