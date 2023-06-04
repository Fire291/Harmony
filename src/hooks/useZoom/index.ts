/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";

const zoomAtom = atomWithStorage("harmony_zoom", {
  scale: 1,
  x: 0,
  y: 0,
});

const useZoom = () => {
  const [stage, setStage] = useAtom(zoomAtom);
  const [scrollEvent, setScrollEvent] = useState<
    "SCROOLL_VERTICAL" | "SCROOLL_HORIZONTAL" | "SCROOLL_ZOOM"
  >("SCROOLL_VERTICAL");

  const handlwRealWheel = (event: KonvaEventObject<WheelEvent>) => {
    if (scrollEvent === "SCROOLL_VERTICAL") {
      setStage((prevScrollPosition) => ({
        ...prevScrollPosition,
        y: -event.evt.deltaY + prevScrollPosition.y,
      }));
    }

    if (scrollEvent === "SCROOLL_HORIZONTAL") {
      setStage((prevScrollPosition) => ({
        ...prevScrollPosition,
        x: -event.evt.deltaY + prevScrollPosition.x,
      }));
    }
    if (scrollEvent === "SCROOLL_ZOOM") {
      const scaleBy = 1.1;
      const stage = event.target?.getStage() as Konva.Stage;
      const oldScale = stage.scaleX();

      const newScale =
        event.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
      const isValidScale = newScale < 6 && newScale > 0.04168314407042724;
      setStage((prev) => ({
        ...prev,
        scale: isValidScale ? newScale : prev.scale,
      }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const KEY = event.key?.toUpperCase();

      if (KEY === "SHIFT") {
        setScrollEvent("SCROOLL_HORIZONTAL");
      }
      if (KEY === "ALT") {
        setScrollEvent("SCROOLL_VERTICAL");
      }
      if (KEY === "CONTROL") {
        setScrollEvent("SCROOLL_ZOOM");
      }
    };

    const handleKeyUp = () => {
      setScrollEvent("SCROOLL_VERTICAL");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return {
    onWheel: handlwRealWheel,
    stage,
  };
};

export default useZoom;
