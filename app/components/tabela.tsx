
import { consultarTimesPorTorneio } from "../api/repository/timeRepository";

export default async function Tabela({id}: {id: string}) {
  
  const times = await consultarTimesPorTorneio(id)

  return (
    <div className='flex flex-col gap-4'>
      <p>{id}</p>
      <h2 className='text-2xl font-bold'>Tabela de Classificação</h2>
      <table className='w-full border-collapse'>
        <thead className="bg-gray-700">
          <tr>
            <th className='border px-4 py-2'>#</th>
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
        <tbody className="">
            {times.map((time, index) => (
                <TimeTabela key= {time.id} props={time} posicao = {index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  )}

  interface TimeTabelaProps {
    id: string
    nome: string;
    vitorias: number;
    empates: number;
    derrotas: number;
    golsPro: number;
    golsContra: number;
    pontos: number;
  }

  function TimeTabela ({props, posicao}: {props: TimeTabelaProps, posicao: number}) {
    return (
        <tr className='text-center'>
            <td className='border px-4 py-2'>{posicao}</td>
            <td className='border px-4 py-2'>{props.nome}</td>
            <td className='border px-4 py-2'>{(props.vitorias + props.derrotas + props.empates)}</td>
            <td className='border px-4 py-2'>{props.vitorias}</td>
            <td className='border px-4 py-2'>{props.empates}</td>
            <td className='border px-4 py-2'>{props.derrotas}</td>
            <td className='border px-4 py-2'>{props.golsPro}</td>
            <td className='border px-4 py-2'>{props.golsContra}</td>
            <td className='border px-4 py-2'>{props.golsPro - props.golsContra}</td>
            <td className='border px-4 py-2'>{props.pontos}</td>
        </tr>
    )}