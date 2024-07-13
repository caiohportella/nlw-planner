import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import CreateLinkModal from "./create-link-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Link {
  id: string;
  title: string;
  url: string;
}

export const ImportantLinks = () => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const { tripId } = useParams();

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then((res) => setLinks(res.data));
  }, [tripId]);

  const openLinkModal = () => {
    setIsLinkModalOpen(true);
  };

  const closeLinkModal = () => {
    setIsLinkModalOpen(false);
  };

  const ensureProtocol = (url: string) => {
    return /^(http|https):\/\//.test(url) ? url : `https://${url}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map((link) => (
          <div
            className="flex items-center justify-between gap-4"
            key={link.id}
          >
            <div className="space-y-1.5 flex-1">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                href={ensureProtocol(link.url)}
                rel="noopener noreferrer"
                target="_blank"
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <Link2 className="text-zinc-400 size-5" />
          </div>
        ))}
      </div>
      <Button onClick={openLinkModal} variant="secondary" size="full">
        <Plus className="size-5" /> Cadastrar novo link
      </Button>

      {isLinkModalOpen && <CreateLinkModal closeLinkModal={closeLinkModal}  />}
    </div>
  );
};
