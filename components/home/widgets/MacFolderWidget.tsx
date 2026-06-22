import Image from "next/image";

export function MacFolderWidget() {
  return (
    <div className="relative">
      <Image
        src="/widgets/mac-folder-96.png"
        alt="Mac folder"
        width={56}
        height={56}
        priority={false}
      />
    </div>
  );
}

