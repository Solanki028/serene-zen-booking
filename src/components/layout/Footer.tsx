import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-24 bg-[#0b132b] text-white">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-20 w-[60%] -translate-x-1/2 rounded-full bg-white/5 blur-2xl" />

      <div className="container mx-auto px-4 py-16">
        {/* elegant divider under brand row */}
        <div className="mx-auto mb-10 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Contact */}
          <div>
            <h3 className="playfair-heading text-2xl font-bold tracking-[-0.2px] mb-3">
              SpaFort
            </h3>
            <p className="playfair-heading text-sm text-white/80 mb-6">
            Authentic doorstep massage & wellness 
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span className="text-white/85">
                  123 Wellness Street, Downtown District
                </span>
              </div>

              <div className="flex items-center gap-3">
  <a
    href="https://t.me/yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
  >
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/20 transition-colors">
      <svg
        className="h-3.5 w-3.5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.999 15.2l-.39 5.5c.56 0 .8-.24 1.1-.53l2.6-2.5 5.4 3.9c.99.54 1.7.25 1.96-.92l3.55-16.7h-.01c.32-1.49-.53-2.08-1.5-1.72L1.53 9.68c-1.45.58-1.43 1.42-.26 1.8l5.48 1.7L18.47 5.6c.58-.38 1.1-.17.67.21L9.999 15.2z" />
      </svg>
    </span>
    <span>Telegram</span>
  </a>
</div>



              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <a
                  href="mailto:info@spafort.com "
                  className="text-white/85 hover:text-white transition-colors"
                >
                 info@spafort.com 
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="playfair-heading text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/ourservices"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/giftvoucher"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Gift Vouchers
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="playfair-heading text-lg font-semibold mb-4">
              Opening Hours
            </h4>
            <div className="space-y-3 text-sm text-white/85">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <Clock className="h-3.5 w-3.5" />
                </span>
                <div>
                  <div>Mon – Fri: 10:00 AM – 9:00 PM</div>
                  <div>Sat – Sun: 9:00 AM – 10:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="playfair-heading text-lg font-semibold mb-4">
              Follow Us
            </h4>

            <div className="flex gap-3 mb-6">
              {/* FB */}
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 text-white/90 hover:bg-white/20 transition"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.06C22 6.495 17.523 2 12 2S2 6.495 2 12.06c0 4.99 3.657 9.133 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.91h-2.33v7.03C18.343 21.193 22 17.05 22 12.06Z" />
                </svg>
              </a>

              {/* IG */}
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 text-white/90 hover:bg-white/20 transition"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.2c3.24 0 3.63.012 4.9.071 3.01.139 4.417 1.53 4.556 4.556.059 1.268.071 1.66.071 4.903s-.012 3.635-.071 4.903c-.139 3.02-1.54 4.417-4.556 4.556-1.268.059-1.66.071-4.9.071s-3.632-.012-4.9-.071c-3.02-.139-4.417-1.54-4.556-4.556C2.585 15.999 2.573 15.607 2.573 12.46s.012-3.635.071-4.903C2.783 4.53 4.17 3.134 7.19 2.995 8.458 2.936 8.86 2.924 12 2.924Zm0 1.8c-3.2 0-3.576.011-4.838.069-2.31.106-3.374 1.16-3.48 3.48-.058 1.262-.069 1.639-.069 4.838s.011 3.576.069 4.838c.106 2.31 1.17 3.374 3.48 3.48 1.262.058 1.638.069 4.838.069s3.576-.011 4.838-.069c2.31-.106 3.374-1.17 3.48-3.48.058-1.262.069-1.638.069-4.838s-.011-3.576-.069-4.838c-.106-2.32-1.17-3.374-3.48-3.48-1.262-.058-1.638-.069-4.838-.069Zm0 3.4a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2Zm0 1.8a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm5.05-3.02a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
                </svg>
              </a>
            </div>

            <div className="text-sm space-y-1">
              <Link
                href="/privacypolicy"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/termsandservice"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Terms & Services
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 mt-12 pt-8 text-center text-sm text-white/70">
          © {new Date().getFullYear()} SpaFort. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
