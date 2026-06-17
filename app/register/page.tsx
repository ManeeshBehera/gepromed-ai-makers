import { Suspense } from "react";
import { RegisterFlow } from "@/components/RegisterFlow";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-20 text-center text-ink-muted">
          Chargement…
        </div>
      }
    >
      <RegisterFlow />
    </Suspense>
  );
}
