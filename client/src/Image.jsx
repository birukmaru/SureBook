export default function Image({ src, ...rest }) {
  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    src = "http://localhost:4000/uploads/" + src;
  }

  console.log("Image source:", src);
  return <img {...rest} src={src} alt="" />;
}
