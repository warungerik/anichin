export const metadata = {
  title: "Anichin API",
  description: "Unofficial Anichin Scraper REST API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
