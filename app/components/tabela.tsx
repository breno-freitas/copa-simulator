export default function Tabela() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>Tabela de Classificação</h2>
      <table className='w-full border-collapse'>
        <thead>
          <tr>
            <th className='border px-4 py-2'>Posição</th>
            <th className='border px-4 py-2'>Time</th>
            <th className='border px-4 py-2'>J</th>
            <th className='border px-4 py-2'>V</th>
            <th className='border px-4 py-2'>E</th>
            <th className='border px-4 py-2'>D</th>
            <th className='border px-4 py-2'>GP</th>
            <th className='border px-4 py-2'>GC</th>
            <th className='border px-4 py-2'>SG</th>
            <th className='border px-4 py-2'>Pts</th>
          </tr>
        </thead>
        <tbody>
            {times.map((time) => (
                <TimeTabela key={time.posicao} props={time} />
            ))}
        </tbody>
      </table>
    </div>
  )}

  interface TimeTabelaProps {
    posicao: number;
    time: string;
    jogos: number;
    vitorias: number;
    empates: number;
    derrotas: number;
    golsMarcados: number;
    golsSofridos: number;
    saldoGols: number;
    pontos: number;
  }

  function TimeTabela ({props}: {props: TimeTabelaProps}) {
    return (
        <tr className='text-center'>
            <td className='border px-4 py-2'>{props.posicao}</td>
            <td className='border px-4 py-2'>{props.time}</td>
            <td className='border px-4 py-2'>{props.jogos}</td>
            <td className='border px-4 py-2'>{props.vitorias}</td>
            <td className='border px-4 py-2'>{props.empates}</td>
            <td className='border px-4 py-2'>{props.derrotas}</td>
            <td className='border px-4 py-2'>{props.golsMarcados}</td>
            <td className='border px-4 py-2'>{props.golsSofridos}</td>
            <td className='border px-4 py-2'>{props.saldoGols}</td>
            <td className='border px-4 py-2'>{props.pontos}</td>
        </tr>
    )}

    let times = [
        {
            posicao: 1,
            time: 'Brasil',
            jogos: 3,
            vitorias: 2,
            empates: 1,
            derrotas: 0,
            golsMarcados: 5,
            golsSofridos: 2,
            saldoGols: 3,
            pontos: 7
        },
        {
            posicao: 2,
            time: 'Argentina',
            jogos: 3,
            vitorias: 2,
            empates: 0,
            derrotas: 1,
            golsMarcados: 4,
            golsSofridos: 3,
            saldoGols: 1,
            pontos: 6
        },
        {
            posicao: 3,
            time: 'França',
            jogos: 3,
            vitorias: 1,
            empates: 1,
            derrotas: 1,
            golsMarcados: 3,
            golsSofridos: 3,
            saldoGols: 0,
            pontos: 4
        },
    ]