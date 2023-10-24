"use client";

import { useEffect } from "react";
import { useProjectModal } from "@/hooks/use-project-modal";
export default function Home() {
  const onOpen = useProjectModal((state) => state.onOpen);
  const isOpen = useProjectModal((state) => state.isOpen);
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return <></>;
}
