import { Link, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
  closeLinkModal: () => void;
}

const CreateLinkModal = ({ closeLinkModal }: CreateLinkModalProps) => {
  const { tripId } = useParams();

  const createLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const title = data.get("title") as string;
    const url = data.get("url") as string;

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    window.document.location.reload();

    closeLinkModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Cadastrar link</h2>
            <button onClick={closeLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem ver os links.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Qual o nome do evento?"
              name="title"
              className="bg-transparent text-lg placeholder:zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Link para o evento"
              name="url"
              className="bg-transparent text-lg placeholder:zinc-400 outline-none flex-1"
            />
          </div>

          <Button variant="primary" size="full">
            Adicionar evento
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateLinkModal;

{
  /*  */
}
