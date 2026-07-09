import { consultarTorneioPorId } from "@/app/api/repository/torneioRepository";
import Tabela from "@/app/components/tabela";

export default async function TorneioPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const torneio = await consultarTorneioPorId(id);

    if (!torneio) {
        return <div>Torneio não encontrado</div>;
    }

    return (
        <div>
            <h1>{torneio.nome}</h1>
            <Tabela id={torneio.id}></Tabela>
        </div>
    );

}