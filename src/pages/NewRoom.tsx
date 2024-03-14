import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/auth.scss'
import { Logo } from '../components/Logo'

export function NewRoom() {
    const navigate = useNavigate();
    const { user } = useAuth()
    const [ newRoom, setNewRoom ] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        
        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom= await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        navigate(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbólica de perguntas e respostas" />
                <strong>Crie salas Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <Logo height={75}></Logo>
                    {/* <img src={logoImg} alt="Letmeask" /> */}
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom} 
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link> </p>
                </div>
            </main>
        </div>
    )
}