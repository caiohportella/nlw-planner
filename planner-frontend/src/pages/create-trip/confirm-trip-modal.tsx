import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (e: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  destination: string;
  eventStartAndEndDate: DateRange | undefined;
}

const ConfirmTripModal = ({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  destination,
  eventStartAndEndDate,
}: ConfirmTripModalProps) => {
  const startDate = eventStartAndEndDate?.from;
  const endDate = eventStartAndEndDate?.to;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">
              Confirmar criação de viagem
            </h2>
            <button onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="text-zinc-100 font-semibold">{destination}</span>{" "}
            nas datas de{" "}
            <span className="text-zinc-100 font-semibold">
              {startDate && endDate
                ? `${format(startDate, "d")} a ${format(
                    endDate,
                    "d"
                  )} de ${format(startDate, "MMMM")}`
                : ""}
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Seu nome completo"
              name="name"
              className="bg-transparent text-lg placeholder:zinc-400 outline-none flex-1"
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="email"
              placeholder="Seu melhor email"
              name="email"
              className="bg-transparent text-lg placeholder:zinc-400 outline-none flex-1"
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </div>

          <Button variant="primary" size="full" type="submit">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmTripModal;
