import { ChangeEventHandler } from "react";
import { Tag, Link } from "lucide-react";

interface CreateLinkFormProps {
  title: string;
  url: string;
  onChange:  ChangeEventHandler<HTMLInputElement>;
}

const CreateLinkForm = ({ title, url, onChange }: CreateLinkFormProps) => (
  <>
    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      <Tag className="size-5 text-zinc-400" />
      <input
        type="text"
        placeholder="Qual o nome do evento?"
        name="title"
        value={title}
        onChange={onChange}
        className="bg-transparent text-lg placeholder:zinc-400 outline-none flex-1"
      />
    </div>

    <div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      <Link className="size-5 text-zinc-400" />
      <input
        type="text"
        placeholder="Link para o evento"
        name="url"
        value={url}
        onChange={onChange}
        className="bg-transparent text-lg placeholder:zinc-400 outline-none flex-1"
      />
    </div>
  </>
);

export default CreateLinkForm;
