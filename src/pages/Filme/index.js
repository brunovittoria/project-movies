import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import './filme-info.css'
import api from '../../services/api'
import { toast } from 'react-toastify'

function Filme() {
    const { id } = useParams()
    const navigate = useNavigate()


    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "3028369dfc056c6679d7a180b532290f",
                    language: "pt-BR",
                }
            })
            .then((response)=> {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log("FILME NAO ENCONTRADO")
                navigate("/", { replace: true})
                return
            })
        }

        loadFilme()

        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("ESSE FILME JA ESTA NA LISTA")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("FILME SALVO COM SUCESSO")
    }
 
    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes do filme...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliaçoes: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme