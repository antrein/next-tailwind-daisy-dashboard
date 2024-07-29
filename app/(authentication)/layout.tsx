export const metadata = {
  title: "Antrein - Dashboard",
  description: "Antrein offers an advanced virtual waiting room service designed to manage high traffic volumes efficiently. Ensure a smooth and fair customer experience with real-time queue management and detailed analytics.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
