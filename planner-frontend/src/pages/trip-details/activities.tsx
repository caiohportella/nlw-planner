import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  id: string;
  title: string;
  occursAt: string;
}

export const Activities = () => {
  const { tripId } = useParams();
  const [activitiesByDate, setActivitiesByDate] = useState<{
    [date: string]: Activity[];
  }>({});

  useEffect(() => {
    api.get(`trips/${tripId}/activities`).then((res) => {
      const activities: Activity[] = res.data.sort((a: Activity, b: Activity) => {
        return new Date(a.occursAt).getTime() - new Date(b.occursAt).getTime();
      });
      const groupedActivities: { [date: string]: Activity[] } = {};

      activities.forEach((activity) => {
        const date = format(parseISO(activity.occursAt), "yyyy-MM-dd");
        if (!groupedActivities[date]) {
          groupedActivities[date] = [];
        }
        groupedActivities[date].push(activity);
      });

      setActivitiesByDate(groupedActivities);
    });
  }, [tripId]);

  return (
    <div className="space-y-8">
      {Object.entries(activitiesByDate).map(([date, activities]) => (
        <div key={date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">
              Dia {format(parseISO(date), "d")}
            </span>
            <span className="text-xs text-zinc-500">
              {format(parseISO(date), "EEEE", { locale: ptBR })}
            </span>
          </div>
          {activities.length > 0 ? (
            <div className="space-y-2.5">
              {activities.map((activity) => (
                <div key={activity.id}>
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">{activity.title}</span>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {format(parseISO(activity.occursAt), "HH:mm")}h
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">
              Nenhuma atividade cadastrada nessa data.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
