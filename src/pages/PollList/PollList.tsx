import { getPolls } from "../../api/polls";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import type { Poll } from "../../types";

const PollList = () => {
  const {
    data: polls = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["polls"],
    queryFn: getPolls,
  });

  const navigate = useNavigate();

  const handleEditButton = (pollId: string) => {
    navigate(`/poll/${pollId}/edit`);
  };

  if (isLoading)
    return (
      <div>
        <p>Cargando encuestas</p>
      </div>
    );

  if (error || !polls)
    return (
      <div>
        <p>Error al cargar encuestas</p>
      </div>
    );

  const pollsArray = Array.isArray(polls) ? polls : [];

  return (
    <div>
      <h2>{polls.length > 0 ? "Encuestas" : "No tienes encuestas"}</h2>
      <Link
        to="/create"
        className="inline-block text-[18px] mb-2 hover:font-semibold"
      >
        <i className="mgc_add_line inline_block mr-1"></i>
        <span>Crear encuesta</span>
      </Link>
      {(pollsArray as Poll[])?.map((poll: Poll) => {
        const isVotedPoll = poll.totalVotes > 0;
        return (
          <div key={poll._id}>
            <Link
              to={`/polls/${poll._id}/share`}
              className="text-xl text-green-600 hover:underline mr-1"
            >
              <span>{poll.question}</span>
            </Link>
            <button
              className={`${
                isVotedPoll
                  ? "text-slate-300"
                  : "text-slate-400 hover:text-slate-500"
              }`}
              title={
                isVotedPoll ? "No puedes editar una encuesta votada" : "Editar"
              }
              onClick={() => handleEditButton(poll._id)}
              disabled={isVotedPoll}
            >
              <i className="mgc_pencil_fill "></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PollList;
