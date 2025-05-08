import { useParams } from "react-router-dom";
import AcomodacaoForm from "../components/AcomodacaoForm";

export default function EditarAcomodacaoPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="w-[83vw] p-6">
            <AcomodacaoForm 
                acomodacaoId={id} 
                onSuccess={() => window.location.href = '/acomodacoes'} 
            />
        </div>
    );
}