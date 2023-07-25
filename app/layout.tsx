import './globals.css'
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import Navbar from './(site)/components/navbar/Navbar';
import Footer from './(site)/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kitsu',
  description: 'Kitsu App - built with Next.js, Tailwind, MongoDB, NextAuth and Prisma',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  // For default font: <body className={inter.className}>

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Asap&display=swap" rel="stylesheet" />
      </head>
      
      <body>
        <div className="row-v min-h-screen">
          <AuthContext>
            <ToasterContext />
            <Navbar />
            <div className="flex-1 row-v">
              {children}
            </div>
            <Footer />
          </AuthContext>
        </div>
      </body>
    </html>
  )
}
