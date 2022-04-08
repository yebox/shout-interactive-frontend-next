import Link from "next/link";

const BtnOutlined = ({ text, link = "" }) => {
  return (
    <Link href={link}>
      <button className="border border-[#60646A] w-full h-[48px] px-[16px] rounded-[8px] whitespace-nowrap">
        <span className="body_heavy text-[#60646A]">{text}</span>
      </button>
    </Link>
  );
};

export default BtnOutlined;
