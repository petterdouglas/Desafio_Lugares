import { IMask, IMaskInput } from "react-imask";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  useChosenCountries,
  useCountries,
  useMenuBar,
} from "../context/Context";
import { useEffect } from "react";

const searchSchema = z.object({
  country: z.string().min(1, "Selecione um país válido"), // retirar os optionals e criar mensagens de erro
  local: z.string().min(1, "Local válido requerido"),
  date: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: "Formato inválido (use MM/YYYY)",
  }),
});

type searchSchema = z.infer<typeof searchSchema>;

export function SearchBar() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<searchSchema>({
    resolver: zodResolver(searchSchema),
    shouldFocusError: false,
  });

  const { countries, loading, error } = useCountries();
  const { isActived } = useMenuBar();
  const { addChosenCountry } = useChosenCountries();

  const Search: SubmitHandler<searchSchema> = (data) => {
    const countryInfo = countries.find((c) => c.name === data.country);

    const searchedCountry = {
      countryName: data.country,
      flag: countryInfo?.flag || null,
      local: data.local,
      date: data.date,
    };
    console.log(searchedCountry);
    addChosenCountry(searchedCountry);
  };

  useEffect(() => {
    if (errors.country) {
      console.log("Country error: " + errors.country.message);
    }
    if (errors.local) {
      console.log("Local error: " + errors.local.message);
    }
    if (errors.date) {
      console.log("Date error: " + errors.date.message);
    }
  }, [errors]);

  return (
    <section
      className={`${
        isActived
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-all duration-300 absolute flex top-0 right-0 h-fit w-[80%] px-5 bg-green py-14 flex-col items-center gap-6 md:relative md:flex md:p-12 md:w-full md:flex-row md:opacity-100 md:pointer-events-auto`}
    >
      <form
        id="form"
        onSubmit={handleSubmit(Search)}
        className="flex flex-col gap-4 w-full md:flex-row md:flex-grow-[1]"
      >
        <div className="font-roboto md:w-[35%]">
          <h2 className="text-sm text-white">País</h2>
          <div
            className={`w-full h-8 text-sm bg-white rounded-sm px-2 ${
              errors.country && "border-none outline-2 outline-danger"
            }`}
          >
            <select
              className="w-full h-full outline-0 text-gray-200"
              defaultValue=""
              {...register("country")}
            >
              <option value="" disabled hidden>
                {error
                  ? "Erro ao carregar..."
                  : loading
                  ? "Carregando..."
                  : "Selecione..."}
              </option>
              {!error &&
                countries.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="font-roboto font-medium md:w-[35%]">
          <h2 className="text-sm text-white">Local</h2>
          <div
            className={`w-full h-8 text-sm bg-white rounded-sm px-2 ${
              errors.local && "outline-2 outline-danger border-none"
            } `}
          >
            <input
              className="w-full h-full outline-0 placeholder-shown:text-gray-200 text-gray-200 bg-white"
              type="text"
              placeholder="Digite o local que deseja conhecer"
              autoComplete="off"
              {...register("local")}
            />
          </div>
        </div>
        <div className="font-roboto w-full md:w-[30%]">
          <h2 className="text-sm text-white">Meta</h2>
          <div
            className={`w-[30%] flex flex-row items-center justify-center h-8 text-sm bg-white rounded-sm px-2 md:w-[80%] ${
              errors.date && "outline-2 outline-danger border-none"
            }`}
          >
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  inputRef={field.ref}
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
                  className="w-full h-full outline-0 text-start"
                  onAccept={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>
      </form>
      <button
        type="submit"
        form="form"
        className="font-roboto text-white text-sm bg-dark-green w-fit py-2 px-10 rounded-sm cursor-pointer self-center md:self-end"
      >
        Adicionar
      </button>
    </section>
  );
}
