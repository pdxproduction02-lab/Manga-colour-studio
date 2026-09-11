export const metadata = {
  title: "Manga Colorizer Ultimate",
  description: "Structure-preserving manga colorization"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0,fontFamily:"system-ui,sans-serif",background:"#0b0b0d",color:"#f5f5f5"}}>
        {children}
      </body>
    </html>
  );
}
