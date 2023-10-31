import Image from 'next/image'
import { Inter } from 'next/font/google'
import ChatPage from './chat'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Link href='http://localhost:3000/chat'>Iniciat Chat</Link>
    </main>
  )
}
