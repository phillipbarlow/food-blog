import footerLogo from "../images/footer-img.jpeg";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-white/20">
      <div className="max-w-5xl mx-auto flex flex-col items-center py-10 px-6 space-y-5">
        <div className="h-46 w-46 overflow-hidden rounded-full shadow-md">
          <img
            src={footerLogo}
            alt="CookBakeShare logo"
            className="h-full w-full object-cover opacity-90"
          />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm tracking-wide text-gray-200">
            © {new Date().getFullYear()} CookBakeShare. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">Built by Phil Barlow</p>
        </div>
      </div>
    </footer>
  );
}
