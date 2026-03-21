// src/components/Footer.jsx
const Footer = () => {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 py-3 text-xs tracking-widest text-[#00FFA3] flex justify-center items-center gap-2">
            <a href="https://github.com/astleligo/crypto-dashboard" className="hover:underline">
                GITHUB LINK
            </a>
            <span>|</span>
            <a href="https://astleligo.github.io/" className="hover:underline">
                ASTLE LIGO
            </a>
        </footer>
    );
};

export default Footer;