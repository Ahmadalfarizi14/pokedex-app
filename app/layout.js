import './globals.css';

export const metadata = {
  title: 'Pokedex Next.js',
  description: 'Proyek Pokedex yang dibuat dengan Next.js App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}