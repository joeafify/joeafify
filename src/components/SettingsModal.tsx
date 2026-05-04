"use client";
import { X } from "lucide-react";
import * as motion from "motion/react-client";
import { useEffect, useRef } from "react";
import ColorSwitcher from "./ColorSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: {
    settings: {
      language: {
        title: string;
      };
      theme: {
        title: string;
      };
      color: {
        title: string;
      };
    };
  };
}

export default function SettingsModal({ open = false, onOpenChange, dict }: SettingsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      id="home"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.3 }}
    >
      <dialog
        id="settings-modal"
        ref={dialogRef}
        onClose={(event) => {
          event.preventDefault();
          onOpenChange(false);
        }}
        onCancel={(event) => {
          event.preventDefault();
          onOpenChange(false);
        }}
        className={`glass m-auto w-full h-full ${open && "flex fixed inset-0"} items-center justify-center p-0 text-inherit shadow-2xl backdrop:glass`}
      >
        <div className="w-max-content max-w-[60vw] rounded-lg p-8 flex flex-col gap-4">
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              onOpenChange(false);
            }}
            className="w-10 h-10 flex justify-center items-center cursor-pointer"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="settings-modal"
          >
            <X className="text-slate-400 group-hover:text-primary transition-colors" />
          </button>
          <section className="flex flex-col justify-center items-center">
            <h2 className="text-2xl text-slate-400 text-center font-bold">
              {dict.settings.language.title}
            </h2>
            <LanguageSwitcher />
          </section>

          {/* <section className="flex flex-col justify-center items-center">
            <h2 className="text-2xl text-slate-400 text-center font-bold">
              {dict.settings.theme.title}
            </h2>
            <ThemeSwitcher />
          </section> */}

          <section className="flex flex-col justify-center items-center">
            <h2 className="text-2xl text-slate-400 text-center font-bold">
              {dict.settings.color.title}
            </h2>
            <ColorSwitcher />
          </section>
        </div>
      </dialog>
    </motion.section>
  );
}
