import { IElement } from "@/editor/core/elements/type";
import { v4 as uuidv4 } from "uuid";
import { IRelativePosition } from "../../types";

const boxElementStart = (
  event: IRelativePosition,
  count: number,
  pageId: string,
  groupId: string
): IElement => {
  const { x, y } = event;
  return {
    id: uuidv4(),
    x,
    y,
    pageId,
    groupId,
    isBlocked: false,
    tool: "BOX",
    visible: true,
    rotate: 0,
    height: 100,
    width: 100,
    view_position: count + 1,
    style: {
      stroke: "#ffffff",
      strokeWidth: 0,
      backgroundColor: "#ffffff",
      shadowBlur: 0,
      shadowColor: "#ffffff",
      shadowOffset: {
        x: 0,
        y: 0,
      },
      shadowOpacity: 1,
      isAllBorderRadius: false,
      borderRadius: 0,
      borderRadiusBottomLeft: 0,
      borderRadiusBottomRight: 0,
      borderRadiusTopLeft: 0,
      borderRadiusTopRight: 0,
    },
  };
};
export default boxElementStart;
