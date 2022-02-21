import type { Dispatch, SetStateAction, MutableRefObject } from 'react';
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '@atoms/button';
import { MdClose } from 'react-icons/md';

interface Props {
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  completeButtonRef?: MutableRefObject<null>;
  children?: React.ReactNode;
  className?: string;
  withActionBtn?: boolean;
  btnnText?: string;
  onActionBtnClick?: () => void;
  actionBtnClassName?: string;
}

const Modal = ({ title, isOpen, setIsOpen, children, className }: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[50] overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div>
              <div
                className={'inline-block max-w-md text-left align-middle transition-all transform'}
              >
                <div className={'shadow-xl rounded-md py-3 mb-8 ' + (className || '')}>
                  <Dialog.Title className="flex  justify-between mb-3">
                    <span className='text-[#01CCFF] '>{title}</span>
                    <Button
                      type="button"
                      className="text-2xl text-[#01CCFF]"
                      onClick={() => setIsOpen(false)}
                    >
                      <MdClose />
                    </Button>
                  </Dialog.Title>
                  <div className='flex items-center justify-center'>
                  {children}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
