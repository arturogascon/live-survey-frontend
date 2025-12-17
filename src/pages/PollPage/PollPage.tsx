import { useParams } from "react-router-dom";
import { useVote } from "../../hooks/useVote";
import { useVoteRealTime } from "../../hooks/useVoteRealTime";
import { getIsPollVoted } from "../../utils/voteStorage";
import { useGetPoll } from "../../hooks/usePoll";

const PollPage = () => {
  const { id } = useParams();

  const showResults = getIsPollVoted(id!);

  const { data: poll, isLoading, error: queryError } = useGetPoll(id!);

  const { mutate, error: mutateError } = useVote(id!);

  const isVotedPoll = mutateError?.response?.status === 403;

  useVoteRealTime(id!);

  if (isLoading)
    return (
      <div>
        <p>Cargando encuesta</p>
      </div>
    );

  if (!poll || queryError)
    return (
      <div>
        <p>Encuesta no encontrada</p>
      </div>
    );

  return (
    <div className="text-center m-auto max-w-[500px]">
      <h2>{poll?.question}</h2>
      {isVotedPoll && (
        <p className="text-slate-500 mb-4 font-medium">
          * Voto previo registrado
        </p>
      )}
      {showResults || isVotedPoll ? (
        <div className="flex flex-col gap-y-2 items-center">
          {poll?.options.map((option) => {
            const votedPerecentage =
              poll.totalVotes &&
              Math.round((option.votes / poll.totalVotes) * 100);

            return (
              <div
                key={option._id}
                className="flex flex-row gap-x-3 w-full justify-between items-center"
              >
                <p className="text-xl font-semibold basis-[100px] text-left text-ellipsis">
                  {option.text}
                </p>
                <div className="h-5 flex-1">
                  <div
                    className="h-full bg-sky-500 rounded-sm"
                    style={{ width: `${votedPerecentage}%` }}
                  ></div>
                </div>
                <p className="text-xl font-semibold">{`${votedPerecentage}%`}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <form className="flex flex-row justify-center">
          {poll?.options.map((option) => (
            <button
              key={option._id}
              className="mx-2 text-xl bg-green-500 py-1 px-3 border [border-style:inset] border-green-200 rounded-lg"
              type="button"
              onClick={() => mutate(option._id)}
            >
              {option.text}
            </button>
          ))}
        </form>
      )}
    </div>
  );
};

export default PollPage;
