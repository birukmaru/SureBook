export default function Image({ src, ...rest }) {
  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    src = "https://sure-book-server.vercel.app/uploads/" + src;
  }

  console.log("Image source:", src);
  return <img {...rest} src={src} alt="" />;
}
