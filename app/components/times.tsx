interface TimeProps {
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


export default function Time(props: TimeProps) {
    return (
        <div>
            <p>Insira os dados do time</p>
            <div>
                <p>Time: {props.time}</p>
                <p>Jogos: {props.jogos}</p>
                <p>Vitórias: {props.vitorias}</p>
                <p>Empates: {props.empates}</p>
                <p>Derrotas: {props.derrotas}</p>
                <p>Gols Marcados: {props.golsMarcados}</p>
                <p>Gols Sofridos: {props.golsSofridos}</p>
                <p>Saldo de Gols: {props.saldoGols}</p>
                <p>Pontos: {props.pontos}</p>
            </div>
        </div>
    )
}
