import { InputNumberProps } from "antd";

export interface Props {
  active: string;
  name: string;
  idx: number;
  code: number;
  type: "inputNumber";
  defaultValue: number;
  property: InputNumberProps;
}
