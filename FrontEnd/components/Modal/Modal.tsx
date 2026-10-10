"use client";

import type { ReactElement, ReactNode } from "react";
import { Dialog } from "radix-ui";
import "./Modal.scss";

type Props = {
  open: boolean; // 控制弹窗的打开和关闭
  onOpenChange: (open: boolean) => void; // 控制弹窗的打开和关闭
  title: string;
  description: string; // 弹窗描述
  trigger: ReactElement; // 触发弹窗的元素
  children: ReactNode; // 弹窗内容
};

export default function Modal({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />

        <Dialog.Content className="modal">
          <div className="modal__header">
            <Dialog.Title className="modal__title">{title}</Dialog.Title>

            <Dialog.Close asChild>
              <button
                type="button"
                className="modal__close"
                aria-label="Close dialog"
              >
                ×
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="modal__description">
            {description}
          </Dialog.Description>

          <div className="modal__body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
