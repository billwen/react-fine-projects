
import { useRef, useState } from "react";
import Modal, { Tip, Tips } from "./components/Modal";

export const Study = (): JSX.Element => {

    const modalRef = useRef<Tips>(null);
    const [open, setOpen] = useState(true);
    const [step, setStep] = useState<number>(-1);
    
    const onClose = (): void => {
        setOpen(false);
    }

    const tips: Tip[] = modalRef?.current?.tips || [];

    return (
        <Modal openModal={open} title="如何使用" onCloseFunc={onClose} ref={modalRef}>

            { step < 0 && (
                <button style={{padding: "6px"}} onClick={() => {
                    setStep(0);
                    modalRef?.current?.tips[0].action();
                }}>开始学习</button>
            )}

            { step >= 0 && (
                <div className="tip" style={{position: "absolute", top: `${tips[step].position().top - 60}px`, left: `${tips[step].position().left}px`}}>
                    {tips[step].text}

                    <button style={{padding: "6px", marginLeft: "10px"}} onClick={() => {
                        if (step < tips.length -1) {
                            setStep( (prv) => {
                                tips[prv + 1].action();
                                return prv + 1;
                            });
                        } else {
                            setStep(-1);
                            setOpen(false);
                        }
                    }}>

                    </button>
                </div>
            )}
        </Modal>
    );
}