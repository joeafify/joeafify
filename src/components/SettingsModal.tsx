"use client";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

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
    <dialog
      id="settings-modal"
      ref={dialogRef}
      onClose={() => onOpenChange(false)}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      className={`fixed inset-0 m-auto w-full h-full ${open && "flex"} items-center justify-center bg-transparent p-0 text-inherit shadow-2xl backdrop:bg-black/60`}
    >
      <div className="w-max-content max-w-[60vw] rounded-lg p-8 flex flex-col gap-3 relative  ">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            onOpenChange(false);
          }}
          className=" cursor-pointer mb-3"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="settings-modal"
        >
          <X className="text-slate-400 group-hover:text-primary transition-colors" />
        </button>
        <section className="flex flex-col justify-center items-center" >
          <h2 className="text-2xl text-slate-400 text-center font-bold">
            {dict.settings.language.title}
          </h2>
          <LanguageSwitcher />
        </section >
        {/* <hr className="border-slate-400 border-0.5" /> */}
        <section className="flex flex-col justify-center items-center">
          <h2 className="text-2xl text-slate-400 text-center font-bold">
            {dict.settings.color.title}
          </h2>
          <ThemeSwitcher />
        </section >

        {/* <hr className="border-slate-400 border-0.5" /> */}
        <section className="flex flex-col justify-center items-center">
          <h2 className="text-2xl text-slate-400 text-center font-bold">
            {dict.settings.theme.title}
          </h2>
          <p className="text-center text-slate-400">Coming soon...</p>
        </section>
      </div>
    </dialog>
  );
}
