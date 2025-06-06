import { useState } from "react";
import Edit from "../assets/mdi_edit.png";
import Remove from "../assets/mdi_close.png";
import { IMask, IMaskInput } from "react-imask";
import { z } from "zod";
import { useDataCountries } from "../context/DataContext";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dateSchema = z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/);

type dateType = z.infer<typeof dateSchema>;
interface CardsContainerProps {
  id: number;
  countryName: string;
  flag: string | null;
  local: string;
  date: string;
}

export function CardContainer(props: CardsContainerProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { removeChosenCountry, editChosenCountry } = useDataCountries();

  const [local, setLocal] = useState(props.local);
  const [date, setDate] = useState(props.date);

  const edit = () => {
    const id = props.id;
    const flag = props.flag;

    if (local === "" || date === "") {
      console.log("campo vazio");
    } else {
      editChosenCountry(props.id, {
        id,
        flag,
        local,
        date,
      });
      setIsDisabled(true);
    }
  };

  return (
    <div className="flex flex-col min-w-fit h-50 border-1 border-gray-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.25)] p-4 rounded-[10px]">
      <div className="relative flex flex-col h-auto gap-2 border-b-1 border-green">
        <div className="absolute top-0 right-0 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsDisabled(false);
            }}
            className="w-4 cursor-pointer"
          >
            <img src={Edit} alt="edit" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              removeChosenCountry(props.id);
            }}
            className="w-4 cursor-pointer"
          >
            <img src={Remove} alt="close" />
          </button>
        </div>
        <div className="w-12">
          <img
            src={props.flag ? props.flag : ""}
            alt="flag"
            className="w-full"
          />
        </div>
        <h2 className="font-roboto text-sm text-green">{props.countryName}</h2>
      </div>
      <div className="flex flex-col gap-2 justify-center w-fit h-full text-xs md:text-sm font-roboto">
        <div className="flex gap-1">
          <p>Local:</p>
          <input
            value={local}
            className={`appearance-none outline-0 pl-1 ${
              !isDisabled &&
              "focus-within:outline-1 focus-within:outline-gray-200 focus-within:rounded-sm"
            }`}
            onChange={(e) => setLocal(e.target.value)}
            disabled={isDisabled}
            autoComplete="off"
          />
        </div>
        <div className="flex gap-1">
          <p>Meta:</p>
          <IMaskInput
            value={date}
            autoComplete="off"
            mask="mm/yyyy"
            blocks={{
              mm: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                placeholderChar: "M",
              },
              yyyy: {
                mask: IMask.MaskedRange,
                from: 1900,
                to: 2100,
                placeholderChar: "A",
              },
            }}
            definitions={{
              m: /[0-1]/,
              M: /[0-9]/,
            }}
            placeholder="mês/ano"
            overwrite
            className={`appearance-none outline-0 pl-1 ${
              !isDisabled &&
              "focus-within:outline-1 focus-within:outline-gray-200 focus-within:rounded-sm"
            }`}
            onAccept={(value: dateType) => setDate(value)}
            disabled={isDisabled}
          />
        </div>
        {!isDisabled && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              edit();
            }}
            className="bg-dark-green w-14 text-white p-1 rounded-sm cursor-pointer self-start hover:bg-green  transition-all ease-in-out duration-300"
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
