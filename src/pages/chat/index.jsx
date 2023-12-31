import Image from "next/image"
import { useState, useEffect } from "react"
import { io } from "socket.io-client"

let socket

const urlRegex =
  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

export default function ChatPage() {
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [todosLosMensajes, setTodosLosMensajes] = useState([])

    useEffect(() => {
      iniciarSockets()
    
      return () => {
        socket.disconnect()
      }
    }, [])
    
    async function iniciarSockets() {
        await fetch("/api/socket")

        socket = io()

        socket.on("chat:mensaje", (mensajeNuevo) => {
            setTodosLosMensajes((mensajesAnteriores) => [
                ...mensajesAnteriores,
                mensajeNuevo
            ])
        })
    }

    function manejarEnvioDeMensaje(evento) {
        evento.preventDefault()

        socket.emit("chat:mensaje", { username, contenido: message })

        setMessage("")
    }

    return (
        <section className="flex flex-col justify-center items-center">
            <h1 className="m-4">Aplicacion de Chat</h1>

            <form onSubmit={manejarEnvioDeMensaje} action="">
                <label>Coloca tu Nombre</label>
                <input
                onChange={(evento) => setUsername(evento.target.value)}
                type="text"
                name=""
                id=""
                className="text-black m-4 pl-2 p-1"
                placeholder="Username" />

                <ul>
                    {todosLosMensajes.map((mensaje, index) => (
                        <li key={index}>
                            {
                                mensaje.contenido.match(urlRegex) ? (
                                    <>
                                        {mensaje.username}: <br />
                                            <Image
                                                src={mensaje.contenido}
                                                alt=""
                                                width={700}
                                                height={700}
                                            />
                                    </>
                                ) : (
                                    <span>
                                        {mensaje.username}: {mensaje.contenido}
                                    </span>
                                )
                            }
                        </li>
                    ))}
                </ul>

                <input
                    onChange={(evento) => setMessage(evento.target.value)}
                    type="text"
                    name=""
                    id=""
                    value={message}
                    className="text-black m-4 pl-2 p-1"
                    placeholder="Escribe tu Mensaje"
                />
                <input type="submit" value="Enviar Mensaje" className="border p-1 cursor-pointer rounded-xl"/>
            </form>
        </section>
    )
}