import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";

const zoomAtom = atomWithStorage("harmony_zoom", {
  scale: 1,
  x: 0,
  y: 0,
});

const useZoom = () => {
  const [stage, setStage] = useAtom(zoomAtom);

  const scaleRelativeToPoint = (
    point: Vector2d,
    increaseScale: boolean,
    event: KonvaEventObject<WheelEvent>
  ) => {
    const scaleBy = 1.13;
    const stage = event.target?.getStage() as Konva.Stage;
    const oldScale = stage?.scaleX?.();
    const mousePointTo = {
      x: point.x / oldScale - stage.x() / oldScale,
      y: point.y / oldScale - stage.y() / oldScale,
    };
    const newScale = increaseScale ? oldScale * scaleBy : oldScale / scaleBy;

    const isValidScale = newScale < 6 && newScale > 0.04168314407042724;

    if (isValidScale) {
      setStage({
        scale: newScale,
        x: (point.x / newScale - mousePointTo.x) * newScale,
        y: (point.y / newScale - mousePointTo.y) * newScale,
      });
    }
  };

  const handlwRealWheel = (event: KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault();
    scaleRelativeToPoint(
      event?.target?.getStage()?.getPointerPosition() as Vector2d,
      event.evt.deltaY < 0,
      event
    );
  };
  return {
    onWheel: handlwRealWheel,
    stage,
  };
};

export default useZoom;
