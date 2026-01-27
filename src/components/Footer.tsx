interface FooterProps {
  dict: {
    footer: {
      rights: string;
    };
  };
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="py-12 px-6 border-t border-white/5 text-center text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          © {new Date().getFullYear()} Joe Afify. {dict.footer.rights}
        </p>
        <div className="flex gap-8">
          <a className="hover:text-white transition-colors" href="https://github.com/joeafify">
            GitHub
          </a>
          <a
            className="hover:text-white transition-colors"
            href="https://www.linkedin.com/in/joeafify"
          >
            LinkedIn
          </a>
        </div>
      </div>
      {/* Spacer for nav */}
      <div className="h-24"></div>
    </footer>
  );
}
