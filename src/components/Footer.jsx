const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 mt-8 text-center text-gray-600 font-['Poppins']">
      <p className="text-sm">
        Made with ❤️ by{" "}
        <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Utkarsh Shukla
        </span>{" "}
        © {currentYear}
      </p>
    </footer>
  );
};

export default Footer;
