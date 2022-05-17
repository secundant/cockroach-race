import type { PaperProps } from '../../atoms';

export interface PopoverProps extends PaperProps {
  open?: boolean;
  anchorNode?: HTMLElement | null;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * @default 16
   */
  marginThreshold?: number;

  className?: string;
  onClose?(): void;
  paperRef?: Ref<HTMLDivElement>;
}

export type PopoverPositionType = 'start' | 'center' | 'end';
export interface PopoverRect {
  width: number;
  height: number;
}

export interface PopoverOrigin {
  vertical: PopoverPositionType;
  horizontal: PopoverPositionType;
}

export interface PopoverRectOffset {
  top: number;
  left: number;
}

export interface PopoverElementPosition extends PopoverRectOffset {
  right: number;
  bottom: number;
}
