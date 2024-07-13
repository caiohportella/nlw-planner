import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import InviteGuestsModal from "../create-trip/invite-guests-modal";

interface Participant {
  id: string;
  name: string;
  email: string;
  isConfirmed: boolean;
}

export const Guests = () => {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((res) => setParticipants(res.data));
  }, [tripId]);

  const openGuestsModal = () => {
    setIsGuestsModalOpen(true);
  };

  const closeGuestsModal = () => {
    setIsGuestsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            className="flex items-center justify-between gap-4"
            key={participant.id}
          >
            <div className="space-y-1.5 flex-1">
              <span className="block font-medium text-zinc-100">
                {participant.name !== ""
                  ? participant.name
                  : `Convidado ${index + 1}`}
              </span>
              <span className="block text-xs text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.isConfirmed ? (
              <CheckCircle2 className="size-5 shrink-0 text-green-400" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5" />
            )}
          </div>
        ))}
      </div>

      <Button onClick={openGuestsModal} variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={participants.map((participant) => participant.email)}
          addNewEmailToInvite={() => {}}
          removeEmailFromInvites={() => {}}
        />
      )}
    </div>
  );
};
