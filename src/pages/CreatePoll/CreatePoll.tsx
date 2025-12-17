import React, { useEffect, useRef, useState } from "react";
import { useCreatePoll } from "../../hooks/usePoll";
import { useNavigate } from "react-router-dom";
import type { Poll } from "../../types";
import Input from "../../components/Input";
import { MAX_OPTIONS_LENGTH } from "../../utils/constants";
import { checkIsOptionRepeated } from "../../utils/optionsUtils";

const CreatePoll = () => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  const createPoll = useCreatePoll();
  const lastOptionRef = useRef<HTMLInputElement>(null);
  const validOptions = options.filter((option) => !!option);

  useEffect(() => {
    if (lastOptionRef && options.length > 2) {
      lastOptionRef?.current?.focus();
    }
  }, [options.length]);

  const navigate = useNavigate();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleOptionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;

    setOptions(newOptions);
  };

  const removeOption = (optionIndex: number) => {
    const updatedOptions = options.filter(
      (_option, index) => index !== optionIndex
    );
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPoll.mutate(
      { question, options },
      {
        onSuccess: (poll: Poll) => {
          navigate(`/polls/${poll._id}/share`);
        },
      }
    );
  };

  const isOptionRepeated = checkIsOptionRepeated(options);

  const optionError = isOptionRepeated ? "No puedes repetir opción" : undefined;
  const questionError =
    question.length > 0 && question.length < 5
      ? "El mínimo de caracteres es 5"
      : question.length > 200
      ? "El máximo de caracteres es 200"
      : "";

  const isSubmitDisabled =
    !question ||
    validOptions.length !== options.length ||
    isOptionRepeated ||
    options.length > 10;

  return (
    <div className="form-container">
      <p
        className={`error-label inline-block h-4 ${
          createPoll.isError ? "visible" : "invisible"
        }`}
      >
        {createPoll.isError && "Error al enviar formulario"}
      </p>

      <h2>Crear encuesta</h2>
      <form onSubmit={handleSubmit}>
        <Input
          value={question}
          label="Pregunta"
          name="question"
          placeholder="Pregunta"
          onChange={handleQuestionChange}
          error={questionError}
        />

        {options.map((option, index, arr) => {
          const optionNumber = index + 1;
          const isLastOption = index === arr.length - 1;

          return (
            <div
              key={`option_container_${optionNumber}`}
              className="flex items-center"
            >
              <Input
                value={option}
                name={`options_${optionNumber}`}
                label={`Opción ${optionNumber}`}
                onChange={(e) => handleOptionsChange(e, index)}
                placeholder={`Opción ${optionNumber}`}
                ref={isLastOption ? lastOptionRef : undefined}
                error={optionError}
              />

              {index > 1 && (
                <button
                  type="button"
                  className="inline-block ml-2 text-slate-600"
                  onClick={() => removeOption(index)}
                  title="Eliminar opción"
                >
                  <i className="mgc_eraser_line block icon-button"></i>
                </button>
              )}
              {isLastOption && optionNumber < MAX_OPTIONS_LENGTH && (
                <button
                  type="button"
                  className="inline-block ml-2 relative"
                  onClick={addOption}
                  title="Agregar opción"
                  disabled={!options.every((option) => !!option)}
                >
                  <i className="mgc_add_line block icon-button"></i>
                </button>
              )}
            </div>
          );
        })}
        <button
          type="submit"
          className={`button self-end ${
            options.length === 2 ? "mr-6" : "mr-10"
          }`}
          disabled={isSubmitDisabled}
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
