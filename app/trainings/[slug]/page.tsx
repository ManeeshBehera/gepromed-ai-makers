import { notFound } from "next/navigation";
import { trainings, getTraining } from "@/lib/trainings";
import { TrainingDetailView } from "@/components/TrainingDetailView";

export function generateStaticParams() {
  return trainings.map((t) => ({ slug: t.slug }));
}

export default function TrainingDetail({
  params,
}: {
  params: { slug: string };
}) {
  const t = getTraining(params.slug);
  if (!t) notFound();
  return <TrainingDetailView t={t} />;
}
