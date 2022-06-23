import React, {  MouseEventHandler, ReactNode, useImperativeHandle, useRef } from "react";
import "./Modal.css";

export type ModalProps = {
    openModal: boolean;
    title: string;
    children: ReactNode;
    onCloseFunc: () => void;
}

export type Tip  = {
    text: string;
    position: () => DOMRect;
    action: () => void;
}

export type Tips = {
    tips: Tip[];
}

const Modal = ( {openModal, title, children, onCloseFunc}: ModalProps, ref: React.Ref<Tips>): JSX.Element | null => {

    const handleClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (event) => {
        if (event.currentTarget.className == "modalContainer") {
            onCloseFunc();
        }
    };

    const handleCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("Cancelled");
        onCloseFunc();
    };

    const handleConfirm: MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("Confirmed");
        onCloseFunc();
    }

    const closeRef = useRef<HTMLButtonElement>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const confirmRef = useRef<HTMLButtonElement>(null);

    const emptyRect = new DOMRect(0, 0, 0, 0);

    useImperativeHandle(ref, () => ({
        tips: [{
                text: "点击这里 关闭窗口",
                position: () => closeRef?.current?.getBoundingClientRect() || emptyRect,
                action: () => closeRef?.current?.focus()
            },
            {
                text: "点击这里 取消操作并关闭窗口",
                position: () => cancelRef?.current?.getBoundingClientRect() || emptyRect,
                action: () => cancelRef?.current?.focus()
            },
            {
                text: "点击这里 确认操作并关闭窗口",
                position: () => confirmRef.current?.getBoundingClientRect() || emptyRect,
                action: () => confirmRef.current?.focus()
            }
        ]
    }));

    if (openModal) {
        return (
            <div className="modalContainer" onClick={handleClose}>
                <div className="modal">
                    <div className="modal__head">
                        <h2>{title}</h2>
                        <button className="modal__close" onClick={onCloseFunc} ref={closeRef}>X</button>
                    </div>

                    {children}

                    <div className="modal__foot">
                        <button className="btn-cancel" onClick={handleCancel} ref={cancelRef}>取消</button>
                        <button className="btn-confirm" onClick={handleConfirm} ref={confirmRef}>确定</button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default React.forwardRef(Modal);