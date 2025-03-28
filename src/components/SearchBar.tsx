interface SearchBarProps {
  actived?: boolean;
}

export function SearchBar({ actived = true }: SearchBarProps) {
  return (
    <section
      className={`${
        actived ? "" : "hidden"
      } absolute top-0 right-0 h-[50%] w-[80%] p-5 bg-green pt-18 flex flex-col gap-4`}
    >
      <div className="font-roboto">
        <h2 className="text-sm text-white">País</h2>
        <div className="w-full h-8 text-sm bg-white rounded-sm px-2">
          <select className="w-full h-full outline-0 text-gray-200" defaultValue="">
            <option value="" disabled selected hidden>
              Selecione...
            </option>
          </select>
        </div>
      </div>
      <div className="font-roboto font-medium">
        <h2 className="text-sm text-white">Local</h2>
        <div className="w-full h-8 text-sm bg-white rounded-sm px-2">
          <input className="w-full h-full outline-0 placeholder-shown:text-gray-200 bg-white" type="text" placeholder="Digite o local que deseja conhecer"/>
        </div>
      </div>
      <div className="font-roboto">
        <h2 className="text-sm text-white">Meta</h2>
        <div className="w-fit h-8 text-sm bg-white rounded-sm px-2">
          <input className="w-fit h-full outline-0 placeholder-shown:text-gray-200 bg-white placeholder-shown:font-normal" type="date" placeholder="mês/ano"/>
        </div>
      </div>
    </section>
  );
}
