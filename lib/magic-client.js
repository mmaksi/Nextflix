import { Magic } from "magic-sdk";
const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    // new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
    new Magic("pk_live_EB656D97B9858CDC")
  );
};

const magic = createMagic();

export default magic;
